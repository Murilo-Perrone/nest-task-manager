import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async onModuleInit() {
    const sampleTasks = [
      {
        title: 'Implementar API',
        description: 'Criar endpoints REST para gerenciamento de tarefas',
        expirationDate: new Date('2024-08-01'),
        assignedUser: 'Murilo',
        status: 'pending',
      },
      {
        title: 'Testar Aplicação',
        description: 'Escrever testes para endpoints usando Jest',
        expirationDate: new Date('2024-08-05'),
        assignedUser: 'Varlei',
        status: 'in progress',
      },
      {
        title: 'Criar Interface',
        description: 'Desenvolver front-end básico usando Fastify e hbs',
        expirationDate: new Date('2024-08-10'),
        assignedUser: 'João',
        status: 'concluded',
      },
      {
        title: 'Documentar API',
        description: 'Adicionar documentação Swagger para a API',
        expirationDate: new Date('2024-08-15'),
        assignedUser: 'Julia',
        status: 'pending',
      },
    ];

    for (const task of sampleTasks) {
      await this.create(task);
    }
  }


  findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  findOne(id: number): Promise<Task> {
    return this.taskRepository.findOneBy({ id });
  }

  async create(taskData: Partial<Task>): Promise<Task> {
    const task = this.taskRepository.create(taskData);
    return this.taskRepository.save(task);
  }

  async update(id: number, taskData: Partial<Task>): Promise<Task> {
    await this.taskRepository.update(id, taskData);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
