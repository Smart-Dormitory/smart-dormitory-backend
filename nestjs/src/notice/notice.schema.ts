import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Notice extends Document {
  @Prop({
    required: true,
  })
  title: string;

  @Prop({
    required: true,
  })
  href: string;
}

export const NoticeSchema = SchemaFactory.createForClass(Notice);
