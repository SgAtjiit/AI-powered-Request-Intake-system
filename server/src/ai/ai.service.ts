import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import {
  REQUEST_CATEGORIES,
  REQUEST_URGENCIES,
  RequestCategory,
  RequestUrgency,
} from '../requests/schemas/request.schema';

export interface AiEnrichment {
  category: RequestCategory;
  summary: string;
  urgency: RequestUrgency;
}

const FALLBACK_ENRICHMENT: AiEnrichment = {
  category: 'general',
  summary: 'Unable to process',
  urgency: 'low',
};

function extractJsonPayload(content: string) {
  const trimmed = content.trim();

  if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
    return trimmed;
  }

  const match = trimmed.match(/\{[\s\S]*\}/);
  return match?.[0] ?? trimmed;
}

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  constructor(private readonly configService: ConfigService) {}

  async enrichRequest(
    name: string,
    email: string,
    message: string,
  ): Promise<AiEnrichment> {
    const apiKey = this.configService.get<string>('OPENROUTER_API_KEY');

    if (!apiKey) {
      this.logger.warn(
        'OPENROUTER_API_KEY is missing. Falling back to defaults.',
      );
      return FALLBACK_ENRICHMENT;
    }

    try {
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'mistralai/mistral-7b-instruct:free',
          temperature: 0.1,
          messages: [
            {
              role: 'system',
              content: [
                'You are a support triage assistant. Analyze the submitted request and return only raw JSON.',
                'Do not include explanations, markdown, or code fences.',
                '',
                'The JSON must strictly follow this shape:',
                '{',
                '  "category": "billing" | "support" | "feedback" | "general",',
                '  "summary": "<one concise sentence summarizing the request>",',
                '  "urgency": "low" | "medium" | "high"',
                '}',
                '',
                'Rules:',
                `- category must be exactly one of: ${REQUEST_CATEGORIES.join(', ')}`,
                `- urgency must be exactly one of: ${REQUEST_URGENCIES.join(', ')}`,
                '- summary must be a single sentence, under 20 words',
                '- Do not add any other keys or text outside the JSON object',
                '',
                'User:',
              ].join('\n'),
            },
            {
              role: 'user',
              content: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          timeout: 15000,
        },
      );

      const rawContent = response.data?.choices?.[0]?.message?.content;

      try {
        const parsed =
          typeof rawContent === 'string'
            ? JSON.parse(extractJsonPayload(rawContent))
            : null;

        if (
          parsed &&
          REQUEST_CATEGORIES.includes(parsed.category) &&
          REQUEST_URGENCIES.includes(parsed.urgency) &&
          typeof parsed.summary === 'string' &&
          parsed.summary.trim().length > 0
        ) {
          return {
            category: parsed.category,
            summary: parsed.summary.trim(),
            urgency: parsed.urgency,
          };
        }

        return FALLBACK_ENRICHMENT;
      } catch {
        this.logger.warn('Failed to parse AI response JSON.');
        return FALLBACK_ENRICHMENT;
      }
    } catch {
      this.logger.error('OpenRouter enrichment failed.');
      return FALLBACK_ENRICHMENT;
    }
  }
}
