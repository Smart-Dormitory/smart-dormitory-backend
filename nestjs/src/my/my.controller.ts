import { Controller, Get } from '@nestjs/common';
import { MyService } from './my.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('my')
@ApiTags('기숙사 정보')
export class MyController {
  constructor(private readonly myService: MyService) {}

  @ApiOperation({ summary: '기숙사 정보에 관련된 API' })
  @Get()
  my() {
    return '기숙사 정보';
  }
}
