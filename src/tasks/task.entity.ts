import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// export type TaskStatus = 'pending' | 'in progress' | 'concluded';
export enum TaskStatus {
    Pending = 'pending',
    InProgress = 'in progress',
    Concluded = 'concluded',
}

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    title: string;

    @Column('text')
    description: string;

    @Column()
    expirationDate: Date;

    @Column({ length: 50 })
    assignedUser: string;

    @Column({ type: 'text' })
    status: string;
    // @Column({ type: 'enum', enum: ['pending', 'in progress', 'concluded'] })
    // status: TaskStatus;
}
