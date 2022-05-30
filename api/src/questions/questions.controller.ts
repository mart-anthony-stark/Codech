import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Role } from '../auth/decorator';
import { Roles } from '../auth/enum';
import { JwtGuard, RoleGuard } from '../auth/guards';
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
  @Role(Roles.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  insertQuestion(@Body() dto: QuestionDto) {
    return this.questionsService.createQuestion(dto);
  }

  @Put(':id')
  @Role(Roles.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  updateQuestion(@Body() dto, @Param('id') id) {
    return this.questionsService.editQuestion(id, dto);
  }

  @Delete(':id')
  @Role(Roles.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  deleteQuestion(@Param('id') id) {
    return this.questionsService.deleteQuestion(id);
  }
}
