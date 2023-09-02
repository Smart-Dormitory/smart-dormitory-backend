import { Module } from '@nestjs/common';
import { ScraperController } from './scraper.controller';
import { MenuModule } from '../menu/menu.module';

@Module({
  imports: [MenuModule],
  controllers: [ScraperController],
})
export class ScraperModule {}
