import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuSchema } from './menu.schema'; // Menu 모델 임포트
import { MenuService } from './menu.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Menu', schema: MenuSchema }]), // Menu 모델 등록
  ],
  providers: [MenuService],
  exports: [MenuService],
})
export class MenuModule {}
