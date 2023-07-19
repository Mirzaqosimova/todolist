import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { TodosService } from './todos.service';
import { CreateAndUpdateTodoDto } from './dto/create-update-todo.dto';
import { Server } from 'socket.io';
import { log } from 'console';
import { UpdateTodoDto } from './dto/update-dto-gateway';

@WebSocketGateway()
export class TodosGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly service: TodosService) {}

  @SubscribeMessage('createTodo')
  async create(@MessageBody() payload: CreateAndUpdateTodoDto) {
    log(payload);
    log(payload.title);
    await this.service.create(payload);
    return this.getAll();
  }

  @SubscribeMessage('updateTodo')
  async update(@MessageBody() payload: UpdateTodoDto) {
    await this.service.update(payload.id, { ...payload });
    return this.service.findAll();
  }

  @SubscribeMessage('deleteTodo')
  async delete(@MessageBody() payload: string) {
    await this.service.remove(payload);
    return this.service.findAll();
  }

  @SubscribeMessage('getAll')
  async getAll() {
    const data = await this.service.findAll();
    this.server.emit('getAllTodos', data);
  }
}
