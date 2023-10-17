import { Controller, Get } from '@nestjs/common';
import { RoomCheckDayService } from './room-check-day.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('room-check-day')
@ApiTags('점호 관련')
export class RoomCheckDayController {
  constructor(private readonly roomCheckDayService: RoomCheckDayService) {}

  @ApiOperation({ summary: '점호에 관련된 API' })
  @Get()
  roomCheckDay() {
    return '점호날';
  }
}
