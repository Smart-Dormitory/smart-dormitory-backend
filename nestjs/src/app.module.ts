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
import { CalendarController } from './calendar/calendar.controller';
import { RentalController } from './rental/rental.controller';
import { ShareSpaceController } from './share-space/share-space.controller';
import { MyModule } from './my/my.module';
import { RoomCheckDayModule } from './room-check-day/room-check-day.module';
import { InfoController } from './info/info.controller';
import { AlertModule } from './alert/alert.module';
import { NoticeModule } from './notice/notice.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ScraperModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL || ''),
    MyModule,
    RoomCheckDayModule,
    AlertModule,
    NoticeModule,
  ],
  controllers: [
    AppController,
    UsersController,
    CalendarController,
    RentalController,
    ShareSpaceController,
    InfoController,
  ],
  providers: [AppService, EmailService],
})
export class AppModule {}
