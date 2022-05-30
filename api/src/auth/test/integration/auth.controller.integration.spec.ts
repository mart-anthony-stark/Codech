import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';

describe('AuthController', () => {
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    const app = moduleRef.createNestApplication();
    await app.init();
  });
});
