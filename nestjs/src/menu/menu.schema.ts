import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString } from 'class-validator';
import { Document } from 'mongoose';

@Schema()
export class Menu extends Document {
  @Prop({
    required: true,
  })
  @IsString()
  breakfast: string;

  @Prop({
    required: true,
  })
  @IsString()
  lunch: string;

  @Prop({
    required: true,
  })
  @IsString()
  dinner: string;
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
