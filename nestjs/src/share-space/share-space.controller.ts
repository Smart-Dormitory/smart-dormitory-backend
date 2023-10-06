import { Controller, Get, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('share-space')
@ApiTags('공유공간 사용현황')
export class ShareSpaceController {

  @Get()
  @ApiOperation({
    summary: '공유공간 사용현황 대여',
    description: '공용공간 사용현황 GET',
  })
  @ApiCreatedResponse({ description: '', type: '' })
  shareSpaceGet() {
    return 'shareSpaceGet';
  }

  @Post()
  @ApiOperation({
    summary: '공유공간 사용현황 대여',
    description: '공용공간 사용현황 POST',
  })
  @ApiCreatedResponse({ description: '', type: '' })
  shareSpacePost() {
    return 'shareSpacePost';
  }

  @Patch()
  @ApiOperation({
    summary: '공유공간 사용현황 대여',
    description: '공용공간 사용현황 PATCH',
  })
  @ApiCreatedResponse({ description: '', type: '' })
  shareSpacePatch() {
    return 'shareSpacePatch';
  }
}
