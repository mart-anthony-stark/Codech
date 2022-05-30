import { IUser } from 'src/auth/interface';

export const userStub = (): IUser => {
  return {
    email: 'mart@gmail.com',
    name: 'mart',
    password: 'password',
    role: 'user',
  };
};
