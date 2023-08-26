import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): boolean {
    return true;
  }
}
