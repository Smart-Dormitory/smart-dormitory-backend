import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { EmailService } from './email/email.service';
import { ScraperModule } from './scraper/scraper.module'; // AuthModule 임포트 추가

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ScraperModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL || ''),
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, EmailService],
})
export class AppModule {}
