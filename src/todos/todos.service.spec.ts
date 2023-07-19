import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { CreateAndUpdateTodoDto } from './dto/create-update-todo.dto';
import { Repository } from 'typeorm';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<object>;
};

describe('TodosService', () => {
  let service: TodosService;
  let repositoryMock: MockType<Repository<Todo>>;
  const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
    () => ({
      findOne: jest.fn().mockReturnThis(),
      findBy: jest.fn().mockReturnValue([]),
      findOneBy: jest.fn().mockReturnValue(undefined),
      save: jest.fn().mockReturnThis(),
    }),
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: getRepositoryToken(Todo),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();
    repositoryMock = module.get(getRepositoryToken(Todo));
    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create todos', () => {
    it('Create a Todo service', async () => {
      const createSpy = jest.spyOn(service, 'create');
      const dto: CreateAndUpdateTodoDto = {} as CreateAndUpdateTodoDto;
      await service.create(dto);
      repositoryMock.findOne(undefined);
      expect(repositoryMock.findOneBy).toHaveBeenCalledWith({
        title: undefined,
      });
      expect(createSpy).toHaveBeenCalledWith(dto);
    });
  });

  describe('GET Todo service', () => {
    it('Get all Todo fuels', () => {
      expect(service.findAll()).toBeDefined();
      expect(service.findAll()).not.toBeNull();
    });
  });

  describe('Get one Todo service', () => {
    it('Get single Todo fuel', () => {
      repositoryMock.findOneBy.mockReturnValue({});
      expect(repositoryMock.findOneBy);
      expect(service.findOne('1')).toBeDefined();
      expect(service.findOne('32')).not.toBeNull();
    });
  });

  describe('Put a Todo', () => {
    it('Update a Todo', async () => {
      repositoryMock.findOne.mockReturnValue({});
      expect(repositoryMock.findOne).toBeDefined();
      repositoryMock.findOneBy.mockReturnValue(undefined);
      expect(repositoryMock.findOneBy);
      expect(
        await service.update('ewe', new CreateAndUpdateTodoDto()),
      ).toBeDefined();
      expect(
        await service.update('ew', new CreateAndUpdateTodoDto()),
      ).not.toBeNull();
    });
  });

  describe('Delete a Todo', () => {
    it('Soft Delete a Todo service', () => {
      repositoryMock.findOneBy.mockReturnValue({
        title: 'dsd',
        is_delete: false,
        deleted_at: new Date(),
      });
      expect(repositoryMock.findOneBy);
      expect(service.remove('1')).toBeDefined();
      expect(service.remove('1')).not.toBeNull();
    });
  });
});
