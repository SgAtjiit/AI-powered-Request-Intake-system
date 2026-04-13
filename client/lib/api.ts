import axios from 'axios';
import { RequestCategory } from './constants';

export interface RequestRecord {
  _id: string;
  name: string;
  email: string;
  message: string;
  category: RequestCategory | null;
  summary: string | null;
  urgency: 'low' | 'medium' | 'high' | null;
  createdAt: string;
  updatedAt: string;
}

export interface RequestListResponse {
  data: RequestRecord[];
  total: number;
  page: number;
  limit: number;
}

export interface CreateRequestInput {
  name: string;
  email: string;
  message: string;
}

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ?? 'http://localhost:3001';

export async function createRequest(payload: CreateRequestInput) {
  const response = await axios.post<RequestRecord>(`${apiBaseUrl}/requests`, payload);
  return response.data;
}

export async function getRequests(params?: {
  page?: number;
  limit?: number;
  category?: RequestCategory;
}) {
  const searchParams = new URLSearchParams();

  if (params?.page) {
    searchParams.set('page', String(params.page));
  }

  if (params?.limit) {
    searchParams.set('limit', String(params.limit));
  }

  if (params?.category) {
    searchParams.set('category', params.category);
  }

  const query = searchParams.toString();
  const response = await fetch(
    `${apiBaseUrl}/requests${query ? `?${query}` : ''}`,
    {
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    throw new Error('Unable to load requests right now.');
  }

  return (await response.json()) as RequestListResponse;
}
