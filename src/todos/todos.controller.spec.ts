import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { CreateAndUpdateTodoDto } from './dto/create-update-todo.dto';

describe('TodosController', () => {
  let controller: TodosController;
  let service: TodosService;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: TodosService,
      useFactory: () => ({
        create: jest.fn(() => []),
        update: jest.fn(() => {
          1;
        }),
        remove: jest.fn(() => []),
        findOne: jest.fn(() => {
          1;
        }),
      }),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [TodosService, ApiServiceProvider],
    }).compile();

    controller = moduleRef.get<TodosController>(TodosController);
    service = moduleRef.get<TodosService>(TodosService);
  });

  it('should be defined controller', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('should be defined', () => {
      expect(controller.findOne).toBeDefined();
    });

    it('should return one tags by id', () => {
      controller.findOne('1ewq2e');
      expect(service.findOne).toHaveBeenCalled();
      expect(service.findOne).not.toEqual(null);
    });
  });

  describe('update', () => {
    it('should be defined', () => {
      expect(controller.update).toBeDefined();
    });

    it('should be calling update method not Equal null', () => {
      const dto = new CreateAndUpdateTodoDto();
      expect(controller.update('er3re', dto)).not.toEqual(null);
    });

    it('should be calling update tags method', () => {
      const dto = new CreateAndUpdateTodoDto();
      controller.update('ew43re', dto);
      expect(service.update).toHaveBeenCalled();
      expect(service.update).not.toHaveBeenCalledWith(dto);
    });
  });

  describe('delete', () => {
    it('should be defined', () => {
      expect(controller.remove).toBeDefined();
    });

    it('should be delete selected tags', () => {
      controller.remove('dwere');
      expect(service.remove).toHaveBeenCalled();
      expect(service.remove).not.toEqual(null);
    });
  });
});
