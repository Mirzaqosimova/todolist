import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from 'src/todos/entities/todo.entity';
import { TodosModule } from 'src/todos/todos.module';
import { TodosService } from 'src/todos/todos.service';
import { Repository } from 'typeorm';
import * as request from 'supertest';

describe('UserController (e2e)', () => {
  let userService: TodosService;
  let userRepository: Repository<Todo>;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TodosModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 6379,
          username: 'postgres',
          password: 'postgres',
          database: 'postgres',
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    userRepository = moduleFixture.get('UserRepository');
    userService = new TodosService(userRepository);
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(async () => {
    await userRepository.query('DELETE FROM users');
  });

  it('[POST] /user : Response is OK if conditions are right', async () => {
    const dto = {
      title: 'ssss',
      status: 'in_progress',
    };

    await request(app.getHttpServer())
      .post('/todos')
      .send(JSON.stringify(dto))
      .expect({ status: HttpStatus.CREATED })
      .expect((response: request.Response) => {
        expect(typeof response.body).toBe('object');
        const payload = response.body;
        expect(typeof payload.id).toBe('number'),
          expect(typeof payload.created_at).toBe('date'),
          expect(payload.title).toEqual(dto.title),
          expect(payload.status).toEqual(dto.status);
      });
  });
});
