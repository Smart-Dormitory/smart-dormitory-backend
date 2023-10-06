import { Controller, Get, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('rental')
@ApiTags('공유물품 대여')
export class RentalController {
  @Get()
  @ApiOperation({ summary: '공용물품 대여', description: '공용물품 대여 GET' })
  @ApiCreatedResponse({ description: '', type: '' })
  rentalGet() {
    return 'rentalGet';
  }

  @Post()
  @ApiOperation({ summary: '공용물품 대여', description: '공용물품 대여 POST' })
  @ApiCreatedResponse({ description: '', type: '' })
  rentalPost() {
    return 'rentalPost';
  }

  @Patch()
  @ApiOperation({
    summary: '공용물품 대여',
    description: '공용물품 대여 Patch',
  })
  @ApiCreatedResponse({ description: '', type: '' })
  rentalPatch() {
    return 'rentalPatch';
  }
}
