import { Module } from '@nestjs/common';
import { NoticeController } from './notice.controller';
import { NoticeService } from './notice.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NoticeSchema } from './notice.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Notice', schema: NoticeSchema }]), // Menu 모델 등록
  ],
  providers: [NoticeService],
  exports: [NoticeService],
  controllers: [NoticeController],
})
export class NoticeModule {}
