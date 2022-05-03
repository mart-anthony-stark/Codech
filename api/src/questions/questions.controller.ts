import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { Role } from 'src/auth/decorator';
import { JwtGuard, RoleGuard } from 'src/auth/guards';
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
  @Role('admin')
  @UseGuards(JwtGuard, RoleGuard)
  insertQuestion(@Body() dto: QuestionDto) {
    return this.questionsService.createQuestion(dto);
  }
}
