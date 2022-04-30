import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { QuestionDto } from './dto';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  getAllQuestions(@Query() query) {
    return this.questionsService.getAllQuestions(query);
  }

  @Post()
  insertQuestion(@Body() dto: QuestionDto) {
    return this.questionsService.createQuestion(dto);
  }
}
