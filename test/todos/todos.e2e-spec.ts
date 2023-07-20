import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { TodosModule } from 'src/todos/todos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from 'src/todos/entities/todo.entity';
import { Repository } from 'typeorm';
import { testTypeOrmConfig } from 'test/utils/db';

describe('TodoController (e2e)', () => {
  let app: INestApplication;
  let repository: Repository<Todo>;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [TodosModule, TypeOrmModule.forRoot(testTypeOrmConfig)],
    }).compile();

    app = module.createNestApplication();
    repository = module.get('TodoRepository');
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  let id = '';

  afterAll(async () => {
    await repository.delete({ id });
    await app.close();
  });

  describe('Todos create', () => {
    describe('create', () => {
      it('Create todos', async () => {
        const response = await request(app.getHttpServer())
          .post('/todos')
          .send({
            title: 'blabla',
            status: 'in_progress',
          })
          .expect(201);
        id = response.body.id;
      });
      it('should be conflict create new todo', () => {
        return request(app.getHttpServer())
          .post('/todos')
          .send({
            title: 'blabla',
            status: 'in_progress',
          })
          .set('Accept', 'application/json')
          .expect(409);
      });

      it('should be bad request', () => {
        return request(app.getHttpServer())
          .post('/todos')
          .set('Accept', 'application/json')
          .send({
            title: 4,
          })
          .expect(400);
      });
    });
  });

  describe('Todos update', () => {
    describe('update', () => {
      it('update todos', async () => {
        await request(app.getHttpServer())
          .put(`/todos/${id}`)
          .send({
            title: 'my todo',
            status: 'in_progress',
          })
          .expect(200);
      });
      it('should be conflict create update todo', () => {
        return request(app.getHttpServer())
          .put(`/todos/${id}`)
          .send({
            title: 'my todo',
            status: 'in_progress',
          })
          .expect(409);
      });

      it('should be bad request', () => {
        return request(app.getHttpServer())
          .post('/todos')
          .set('Accept', 'application/json')
          .send({
            title: 4,
          })
          .expect(400);
      });
    });
  });

  describe('Todos get one', () => {
    describe('update', () => {
      it('get one todo', async () => {
        await request(app.getHttpServer())
          .get(`/todos/${id}`)
          .expect(200)
          .expect((response: request.Response) => {
            expect(typeof response.body).toBe('object');
            const payload = response.body;
            expect(payload.id).toEqual(id);
          });
      });
    });
  });

  describe('Todos delete', () => {
    describe('update', () => {
      it('Delete todo', async () => {
        await request(app.getHttpServer()).delete(`/todos/${id}`).expect(200);
      });
    });
  });
});
