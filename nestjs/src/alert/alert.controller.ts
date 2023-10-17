import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('alert')
@ApiTags('고장 및 사고 신고')
export class AlertController {
  @Get()
  @ApiOperation({
    summary: '고장 및 사고 신고',
    description: '고장 및 사고 신고 GET',
  })
  @ApiCreatedResponse({ description: '', type: '' })
  alertGet() {
    return 'alertGet';
  }

  @Post()
  @ApiOperation({
    summary: '고장 및 사고 신고',
    description: '고장 및 사고 신고 POST',
  })
  @ApiCreatedResponse({ description: '', type: '' })
  alertPost() {
    return 'alertPost';
  }

  @Patch()
  @ApiOperation({
    summary: '고장 및 사고 신고',
    description: '고장 및 사고 신고 PATCH',
  })
  @ApiCreatedResponse({ description: '', type: '' })
  alertPatch() {
    return 'alertPatch';
  }

  @Delete()
  @ApiOperation({
    summary: '고장 및 사고 신고',
    description: '고장 및 사고 신고 DELETE',
  })
  @ApiCreatedResponse({ description: '', type: '' })
  alertDelete() {
    return 'alertDelete';
  }
}
