import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('info')
@ApiTags('건의 사항')
export class InfoController {
  constructor() {}
  @Get()
  @ApiOperation({
    summary: '건의 사항',
    description: '건의 사항 GET',
  })
  @ApiCreatedResponse({ description: '', type: '' })
  infoGet() {
    return 'infoGet';
  }

  @Post()
  @ApiOperation({
    summary: '건의 사항',
    description: '건의 사항 POST',
  })
  @ApiCreatedResponse({ description: '', type: '' })
  infoPost() {
    return 'infoPost';
  }

  @Patch()
  @ApiOperation({
    summary: '건의 사항',
    description: '건의 사항 PATCH',
  })
  @ApiCreatedResponse({ description: '', type: '' })
  infoPatch() {
    return 'infoPatch';
  }

  @Delete()
  @ApiOperation({
    summary: '건의 사항',
    description: '건의 사항 DELETE',
  })
  @ApiCreatedResponse({ description: '', type: '' })
  infoDelete() {
    return 'infoDelete';
  }
}
