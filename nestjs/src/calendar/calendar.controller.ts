import { Controller, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('calendar')
@ApiTags('관사 일정')
export class CalendarController {
  @Get()
  @ApiOperation({ summary: '관사 일정', description: '관사 일정 GET' })
  @ApiCreatedResponse({ description: '', type: '' })
  calendarGet() {
    return 'calendarGet';
  }
}
