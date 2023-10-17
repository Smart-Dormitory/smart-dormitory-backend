import { Module } from '@nestjs/common';
import { RoomCheckDayService } from './room-check-day.service';
import { RoomCheckDayController } from './room-check-day.controller';

@Module({
  providers: [RoomCheckDayService],
  controllers: [RoomCheckDayController]
})
export class RoomCheckDayModule {}
