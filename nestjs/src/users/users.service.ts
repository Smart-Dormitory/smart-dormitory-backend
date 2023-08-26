import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongoClient } from 'mongodb';

@Injectable()
export class UsersService {
  private readonly client: MongoClient;
  private readonly dbName = this.configService.get<string>('DATABASE_NAME');

  constructor(private configService: ConfigService) {
    const uri = this.configService.get<string>('DATABASE_URL');
    if (uri != null) {
      this.client = new MongoClient(uri);
    }
    this.client.connect();
  }
}
