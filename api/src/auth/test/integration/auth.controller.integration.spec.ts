import { Test } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { Connection } from 'mongoose';
import { DatabaseService } from '../../../database/database.service';
import { userStub } from '../stubs/user.stub';
import * as request from 'supertest';

describe('AuthController', () => {
  let dbConnection: Connection;
  let httpServer: any;
  let app: any;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();

    dbConnection = moduleRef
      .get<DatabaseService>(DatabaseService)
      .getDbHandle();
    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await dbConnection.collection('users').deleteMany({});
  });

  describe('Get Users', () => {
    it('Should return an array of users', async () => {
      await dbConnection.collection('users').insertOne(userStub());
      const response = await request(httpServer).get('/auth/users');

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject([userStub()]);
    });
  });

  describe('Register User', () => {
    it('Should create new user', async () => {
      const createUserRequest = {
        name: userStub().name,
        email: userStub().email,
        password: userStub().password,
      };
      const response = await request(httpServer)
        .post('/auth/signup')
        .send(createUserRequest);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(createUserRequest);

      const user = await dbConnection
        .collection('users')
        .findOne({ email: createUserRequest.email });

      expect(user).toMatchObject(createUserRequest);
    });
  });
});
