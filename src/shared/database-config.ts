import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Todo } from 'src/todos/entities/todo.entity';
import { DB_USER, DB_PASSWORD, DB_NAME } from './env';

export const typeOrmConfig: TypeOrmModuleOptions = {
  name: 'default',
  type: 'postgres',
  host: 'localhost',
  port: 6379,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  entities: [Todo],
};
