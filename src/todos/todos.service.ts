import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { CreateAndUpdateTodoDto } from './dto/create-update-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  //User qo'shilgandan keyin user bilan qilish kerak
  async create(createTodoDto: CreateAndUpdateTodoDto) {
    const isExists = await this.todoRepository.findOneBy({
      title: createTodoDto.title,
    });
    if (isExists) {
      throw new ConflictException('This title already exists');
    }
    return this.todoRepository.save({ ...createTodoDto });
  }

  async findAll() {
    return this.todoRepository.findBy({ is_delete: false });
  }

  findOne(id: string) {
    return this.todoRepository.findOneBy({ id, is_delete: false });
  }

  async update(id: string, updateTodoDto: CreateAndUpdateTodoDto) {
    const [is_exists, duplicate] = await Promise.all([
      this.todoRepository.findOne({ where: { id } }),
      this.todoRepository.findOneBy({
        title: updateTodoDto.title,
        is_delete: false,
      }),
    ]);
    if (!is_exists) {
      throw new NotFoundException('Todo Not found');
    } else if (duplicate) {
      throw new ConflictException('This title already exists');
    }
    is_exists.title = updateTodoDto.title;
    is_exists.status = updateTodoDto.status;

    return this.todoRepository.save(is_exists);
  }

  async remove(id: string) {
    const is_exists = await this.todoRepository.findOneBy({ id });
    if (!is_exists) {
      throw new NotFoundException('Todo Not found');
    }
    is_exists.is_delete = true;
    is_exists.deleted_at = new Date();

    await this.todoRepository.save(is_exists);
  }
}
