import { v4 as uuidv4 } from 'uuid';
import { Task, TaskStatus, CreateTaskRequest } from '../types';

export class TaskModel {
  static create(taskData: CreateTaskRequest): Task {
    const now = new Date();
    return {
      id: uuidv4(),
      title: taskData.title,
      description: taskData.description,
      status: taskData.status || TaskStatus.PENDING,
      createdAt: now,
      updatedAt: now,
    };
  }

  static update(existingTask: Task, updates: Partial<Task>): Task {
    return {
      ...existingTask,
      ...updates,
      updatedAt: new Date(),
    };
  }
}