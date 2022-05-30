import { IUser } from 'src/auth/interface';

export const userStub = (): IUser => {
  return {
    email: 'mart@gmail.com',
    name: 'Mart Anthony',
    password: 'password',
    role: 'user',
  };
};
