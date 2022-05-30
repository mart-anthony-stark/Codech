import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { Connection } from 'mongoose';
import { DatabaseService } from '../../../database/database.service';
import { userStub } from '../stubs/user.stub';

describe('AuthController', () => {
  let dbConnection: Connection;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    const app = moduleRef.createNestApplication();
    await app.init();

    dbConnection = moduleRef
      .get<DatabaseService>(DatabaseService)
      .getDbHandle();
  });

  describe('getUsers', async () => {
    await dbConnection.collection('users').insertOne(userStub());
  });
});
