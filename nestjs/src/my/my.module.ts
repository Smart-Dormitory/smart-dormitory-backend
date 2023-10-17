import { Module } from '@nestjs/common';
import { MyService } from './my.service';
import { MyController } from './my.controller';

@Module({
  providers: [MyService],
  controllers: [MyController]
})
export class MyModule {}
