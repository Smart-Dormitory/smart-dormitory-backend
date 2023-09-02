import { Model } from 'mongoose';
import { Menu } from './menu.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common'; // Menu 모델 임포트

@Injectable()
export class MenuService {
  constructor(@InjectModel('Menu') private readonly menuModel: Model<Menu>) {}

  async clearAndCreateMenus(
    menus: Array<{ breakfast: string; lunch: string; dinner: string }>,
  ): Promise<void> {
    // 데이터 삭제
    await this.menuModel.deleteMany({});

    // 데이터 생성
    await this.menuModel.insertMany(menus);
  }
}
