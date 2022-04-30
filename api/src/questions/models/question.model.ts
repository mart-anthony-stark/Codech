import * as mongoose from 'mongoose';

export const QuestionSchema = new mongoose.Schema(
  {
    category: String,
    question: String,
    choices: Array,
    answer: String,
  },
  { timestamps: true },
);
