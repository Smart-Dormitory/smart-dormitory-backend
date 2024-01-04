import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Notice } from './notice.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class NoticeService {
  constructor(
    @InjectModel('Notice') private readonly noticeModel: Model<Notice>,
  ) {}

  async clearAndCreateNotice(
    notice: Array<{
      title: string;
      href: string;
    }>,
  ): Promise<void> {
    try {
      // 데이터 삭제 (모든 데이터 삭제)
      const deleteResult = await this.noticeModel.deleteMany({});
      console.log('Delete Result:', deleteResult);

      // 데이터 생성
      const insertResult = await this.noticeModel.insertMany(notice);
      console.log('Insert Result:', insertResult);
    } catch (error) {
      console.error('Error in clearAndCreateNotice:', error);
    }
  }

  async getAllNotice(): Promise<Notice[]> {
    return this.noticeModel.find({}, { _id: 0, __v: 0 }).exec();
  }
}
