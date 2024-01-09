import { Module } from '@nestjs/common';
import { ScraperController } from './scraper.controller';
import { MenuModule } from '../menu/menu.module';
import { NoticeModule } from '../notice/notice.module';

@Module({
  imports: [MenuModule, NoticeModule],
  controllers: [ScraperController],
})
export class ScraperModule {}
