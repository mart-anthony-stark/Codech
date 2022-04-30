import { Injectable } from '@nestjs/common';
import { QuestionInterface } from './interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { QuestionDto } from './dto';

@Injectable({})
export class QuestionsService {
  constructor(
    @InjectModel('Question')
    private readonly questionModel: Model<QuestionInterface>,
  ) {}

  async getAllQuestions(query) {
    const questions = await this.questionModel.find(query);
    return questions;
  }

  async createQuestion(dto: QuestionDto) {
    const question = new this.questionModel(dto);
    await question.save();
    return question;
  }
}
