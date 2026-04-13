import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RequestDocument = HydratedDocument<Request>;

export const REQUEST_CATEGORIES = [
  'billing',
  'support',
  'feedback',
  'general',
] as const;

export const REQUEST_URGENCIES = ['low', 'medium', 'high'] as const;

export type RequestCategory = (typeof REQUEST_CATEGORIES)[number];
export type RequestUrgency = (typeof REQUEST_URGENCIES)[number];

@Schema({ timestamps: true })
export class Request {
  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, required: true })
  email!: string;

  @Prop({ type: String, required: true })
  message!: string;

  @Prop({
    type: String,
    enum: REQUEST_CATEGORIES,
    default: null,
  })
  category!: RequestCategory | null;

  @Prop({ type: String, default: null })
  summary!: string | null;

  @Prop({
    type: String,
    enum: REQUEST_URGENCIES,
    default: null,
  })
  urgency!: RequestUrgency | null;
}

export const RequestSchema = SchemaFactory.createForClass(Request);
