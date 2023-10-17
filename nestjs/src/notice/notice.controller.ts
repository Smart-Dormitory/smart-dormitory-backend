import { Controller, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('notice')
@ApiTags('공지사항')
export class NoticeController {
  @Get()
  @ApiOperation({
    summary: '공지사항',
    description: '공지사항 GET',
  })
  @ApiCreatedResponse({ description: '', type: '' })
  noticeGet() {
    return 'noticeGet';
  }
}
