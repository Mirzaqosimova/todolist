import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { TodosModule } from 'src/todos/todos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from 'src/todos/entities/todo.entity';
import { Repository } from 'typeorm';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let repository: Repository<Todo>;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TodosModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 6379,
          username: 'postgres',
          password: 'postgres',
          database: 'postgres',
          entities: [Todo],
          synchronize: false,
        }),
      ],
    }).compile();

    app = module.createNestApplication();
    repository = module.get('TodoRepository');
    await repository.clear();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  //   beforeAll(async () => {
  //     const moduleFixture: TestingModule = await Test.createTestingModule({
  //       imports: [AppModule],
  //     }).compile()

  //     app = moduleFixture.createNestApplication()
  //     await app.init()

  //     // tip: access the database connection via
  //     // const connection = app.get(Connection)
  //     // const a = connection.manager
  //   })

  //   afterAll(async () => {
  //     await Promise.all([
  //       app.close(),
  //     ])
  //   })

  let id = '';

  describe('Todos create', () => {
    describe('create', () => {
      it('authenticates user with valid credentials and provides a jwt token', async () => {
        const response = await request(app.getHttpServer())
          .post('/todos')
          .send({
            title: 'blabla',
            status: 'in_progress',
          })
          .expect(201);
        id = response.body.id;
      });
      it('should be conflict create new country', () => {
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
      it('authenticates user with valid credentials and provides a jwt token', async () => {
        await request(app.getHttpServer())
          .put(`/todos/${id}`)
          .send({
            title: 'my todo',
            status: 'in_progress',
          })
          .expect(200);
      });
      it('should be conflict create new country', () => {
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
      it('authenticates user with valid credentials and provides a jwt token', async () => {
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
});
