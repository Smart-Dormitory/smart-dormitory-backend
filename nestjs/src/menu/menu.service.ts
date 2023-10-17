import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Menu } from './menu.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MenuService {
  constructor(@InjectModel('Menu') private readonly menuModel: Model<Menu>) {}

  async clearAndCreateMenus(
    menus: Array<{
      date: string;
      breakfast: string;
      lunch: string;
      dinner: string;
    }>,
  ): Promise<void> {
    // 데이터 삭제
    await this.menuModel.deleteMany({});

    // 데이터 생성
    await this.menuModel.insertMany(menus);
  }

  async getAllMenus(): Promise<Menu[]> {
    return this.menuModel.find({}, { _id: 0, __v: 0 }).exec();
  }
}
