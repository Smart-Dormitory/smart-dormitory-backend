import { Controller, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { NoticeService } from './notice.service';

@Controller('notice')
@ApiTags('공지사항')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Get()
  @ApiOperation({
    summary: '공지사항',
    description: '공지사항 GET',
  })
  @ApiCreatedResponse({ description: '', type: '' })
  async getAllNotice() {
    try {
      const notices = await this.noticeService.getAllNotice();
      return { data: notices };
    } catch (error) {
      return { error: 'Failed' };
    }
  }
}
