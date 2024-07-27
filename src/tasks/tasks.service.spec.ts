import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('TasksService', () => {
  let service: TasksService;
  let repository: Repository<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repository = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all tasks', async () => {
    const taskArray: Task[] = [
      {
        id: 1,
        title: 'Test Task 1',
        description: 'Description',
        expirationDate: new Date(),
        assignedUser: 'João',
        status: TaskStatus.Pending,
      },
      {
        id: 2,
        title: 'Test Task 2',
        description: 'Description',
        expirationDate: new Date(),
        assignedUser: 'Julia',
        status: TaskStatus.InProgress,
      },
    ];

    jest.spyOn(repository, 'find').mockResolvedValue(taskArray);

    expect(await service.findAll()).toEqual(taskArray);
  });

  it('should find one task', async () => {
    const taskId = 1;
    const task: Task = {
      id: taskId,
      title: 'Test Task',
      description: 'Description',
      expirationDate: new Date(),
      assignedUser: 'João',
      status: TaskStatus.Pending,
    };

    jest.spyOn(repository, 'findOneBy').mockResolvedValue(task);

    expect(await service.findOne(taskId)).toEqual(task);
  });

  // Add more tests for create, update, delete
});
