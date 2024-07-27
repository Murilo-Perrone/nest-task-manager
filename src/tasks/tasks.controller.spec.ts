import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task.entity';

describe('TasksController', () => {
  let tasksController: TasksController;
  let tasksService: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: {
            findAll: jest.fn(() => []),
            findOne: jest.fn((id: number) => ({
              id,
              title: 'Test Task',
              description: 'Description',
              expirationDate: new Date(),
              assignedUser: 'João',
              status: TaskStatus.Pending,
            })),
            create: jest.fn((taskData) => taskData),
            update: jest.fn((id, taskData) => taskData),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    tasksController = module.get<TasksController>(TasksController);
    tasksService = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(tasksController).toBeDefined();
  });

  it('should return an array of tasks', async () => {
    const result = await tasksController.findAll();
    expect(result).toEqual([]);
  });

  it('should return a single task', async () => {
    const taskId = 1;
    const result = await tasksController.findOne(taskId.toString());
    expect(result).toEqual({
      id: taskId,
      title: 'Test Task',
      description: 'Description',
      expirationDate: expect.any(Date),
      assignedUser: 'João',
      status: TaskStatus.Pending,
    });
  });

  // Add more tests for create, update, delete
});
