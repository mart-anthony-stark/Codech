import { Injectable } from '@nestjs/common';
import { QuestionInterface } from './interface';
import { Model, Types } from 'mongoose';
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

  async editQuestion(id: Types.ObjectId, dto: QuestionDto) {
    const question = await this.questionModel.findOneAndUpdate(
      { _id: id },
      {
        $set: dto,
      },
      { new: true },
    );

    return question;
  }
}
