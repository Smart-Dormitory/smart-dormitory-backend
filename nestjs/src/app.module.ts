import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://@wisoft.totgrt9.mongodb.net/?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
