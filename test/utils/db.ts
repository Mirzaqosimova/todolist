import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Todo } from 'src/todos/entities/todo.entity';
import * as dotenv from 'dotenv';

dotenv.config();
const { DB_NAME, DB_USER, DB_PASSWORD, DB_PORT, DB_HOST } = process.env;
export const testTypeOrmConfig: TypeOrmModuleOptions = {
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
