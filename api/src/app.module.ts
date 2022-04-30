import { Module } from '@nestjs/common';
import { QuestionsModule } from './questions/questions.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URI),
    QuestionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
