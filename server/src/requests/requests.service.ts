import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { AiService } from '../ai/ai.service';
import { CreateRequestDto } from './dto/create-request.dto';
import {
  Request,
  RequestCategory,
  RequestDocument,
} from './schemas/request.schema';

@Injectable()
export class RequestsService {
  private readonly logger = new Logger(RequestsService.name);

  constructor(
    @InjectModel(Request.name)
    private readonly requestModel: Model<RequestDocument>,
    private readonly aiService: AiService,
  ) {}

  async create(dto: CreateRequestDto) {
    const savedDoc = await this.requestModel.create({
      ...dto,
      category: null,
      summary: null,
      urgency: null,
    });

    setImmediate(async () => {
      try {
        const enrichment = await this.aiService.enrichRequest(
          savedDoc.name,
          savedDoc.email,
          savedDoc.message,
        );

        await this.requestModel.findByIdAndUpdate(savedDoc._id, enrichment);
      } catch {
        this.logger.warn(
          `Request ${savedDoc._id.toString()} enrichment failed.`,
        );
      }
    });

    return savedDoc;
  }

  async findAll(page = 1, limit = 10, category?: RequestCategory) {
    const safePage = Math.max(page, 1);
    const safeLimit = Math.max(limit, 1);
    const filter: FilterQuery<RequestDocument> = category ? { category } : {};

    const [data, total] = await Promise.all([
      this.requestModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip((safePage - 1) * safeLimit)
        .limit(safeLimit)
        .lean()
        .exec(),
      this.requestModel.countDocuments(filter).exec(),
    ]);

    return {
      data,
      total,
      page: safePage,
      limit: safeLimit,
    };
  }
}
