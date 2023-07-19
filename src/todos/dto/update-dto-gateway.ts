import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TodoStatus } from '../../enums/Todo-enums';

export class UpdateTodoDto {
  id: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsEnum(TodoStatus)
  status: TodoStatus;
}
