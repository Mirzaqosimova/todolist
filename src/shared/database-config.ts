import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Todo } from 'src/todos/entities/todo.entity';
import { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT } from './env';

export const typeOrmConfig: TypeOrmModuleOptions = {
  name: 'default',
  type: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  entities: [Todo],
};
