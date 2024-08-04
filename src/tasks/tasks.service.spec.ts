import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Any, Repository, UpdateResult } from 'typeorm';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

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
          // useValue: {
          //   create: jest.fn(),
          //   save: jest.fn(),
          //   find: jest.fn(),
          //   findOne: jest.fn(),
          //   remove: jest.fn(),
          // },
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

  // Test task creation
  it('should create a new task', async () => {
    const createTaskDto: CreateTaskDto = {
      title: 'New Task',
      description: 'Some description',
      expirationDate: new Date(),
      assignedUser: 'Murilo',
      status: TaskStatus.Pending,
    };
  
    const savedTask = {
      id: 1,
      ...createTaskDto,
    };

    // Mock the repository.create and repository.save methods
    jest.spyOn(repository, 'create').mockReturnValue(savedTask as Task);
    jest.spyOn(repository, 'save').mockResolvedValueOnce(savedTask as Task);
    const result = await service.create(createTaskDto);
    expect(result).toEqual(savedTask);
    expect(repository.save).toHaveBeenCalledWith(savedTask);
  });
  
  // Test task Update
  it('should update a task', async () => {
    const updateTaskDto: UpdateTaskDto = {
      title: 'Updated Task',
    };
  
    const existingTask = {
      id: 1,
      title: 'Task 1',
      description: 'Some description',
      expirationDate: new Date(),
      assignedUser: 'Julia',
      status: TaskStatus.Pending,
    };
  
    const updatedTask = {
      ...existingTask,
      ...updateTaskDto,
    };
  
    jest.spyOn(repository, 'update').mockReturnValue(null);
    jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(updatedTask as Task);
    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(updatedTask as Task);
    const result = await service.update(1, updateTaskDto);
    expect(result).toEqual(updatedTask);
    expect(repository.update).toHaveBeenCalledWith(1, updateTaskDto);
  });

  // Test task Delete
  it('should delete a task', async () => {
    const task = {
      id: 1,
      title: 'Task 1',
      description: 'Some description',
      expirationDate: new Date(),
      assignedUser: 'Murilo',
      status: TaskStatus.Pending,
    };
  
    jest.spyOn(repository, 'delete').mockResolvedValueOnce(null);
  
    await service.delete(1);
    expect(repository.delete).toHaveBeenCalledWith(1);
  });
  
  // Test invalid title on Create
  it('should throw an error if title is empty when creating a task', async () => {
    const createTaskDto: CreateTaskDto = {
      title: '', // Invalid title
      description: 'Some description',
      expirationDate: new Date(),
      assignedUser: 'João',
      status: TaskStatus.Pending,
    };
  
    await expect(service.create(createTaskDto)).rejects.toThrow();
  });

  // Test invalid title on Update
  it('should throw an error if title is empty when updating a task', async () => {
    const updateTaskDto: UpdateTaskDto = {
      title: '', // Invalid title
    };
  
    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(new Task());
    await expect(service.update(1, updateTaskDto)).rejects.toThrow();
  });

  // Test invalid expiration date on Create
  it('should throw an error if expirationDate is invalid when creating a task', async () => {
    const createTaskDto: CreateTaskDto = {
      title: 'New Task',
      description: 'Some description',
      expirationDate: (Object) (new String('abc')), // Invalid expirationDate
      assignedUser: 'Murilo',
      status: TaskStatus.Pending,
    };
  
    await expect(service.create(createTaskDto)).rejects.toThrow();
  });
  
  // Test invalid expiration date on Update
  it('should throw an error if expirationDate is invalid when updating a task', async () => {
    const updateTaskDto: UpdateTaskDto = {
      expirationDate: null, // Invalid expirationDate
    };
  
    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(new Task());
    await expect(service.update(1, updateTaskDto)).rejects.toThrow();
  });

  // Test invalid status on Create
  it('should throw an error if status is invalid when creating a task', async () => {
    const createTaskDto: CreateTaskDto = {
      title: 'New Task',
      description: 'Some description',
      expirationDate: new Date(),
      assignedUser: 'Julia',
      status: 'invalid_status' as TaskStatus, // Invalid status
    };
  
    await expect(service.create(createTaskDto)).rejects.toThrow();
  });
  
  // Test invalid status on Update
  it('should throw an error if status is invalid when updating a task', async () => {
    const updateTaskDto: UpdateTaskDto = {
      status: 'invalid_status' as TaskStatus, // Invalid status
    };
  
    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(new Task());
    await expect(service.update(1, updateTaskDto)).rejects.toThrow();
  });
});
