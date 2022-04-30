import { IsNotEmpty } from 'class-validator';

export class QuestionDto {
  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  question: string;

  @IsNotEmpty()
  choices: string[];

  @IsNotEmpty()
  answer: string;
}
