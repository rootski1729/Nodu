import { Task, TaskStatus, TaskQueryParams, PaginatedResponse } from '../types';

class InMemoryDatabase {
  private tasks: Task[] = [];

  create(task: Task): Task {
    this.tasks.push(task);
    return task;
  }


  findAll(params: TaskQueryParams = {}): PaginatedResponse<Task> {
    let filteredTasks = [...this.tasks];

    if (params.status) {
      filteredTasks = filteredTasks.filter(task => task.status === params.status);
    }

    if (params.search) {
      const searchTerm = params.search.toLowerCase();
      filteredTasks = filteredTasks.filter(
        task =>
          task.title.toLowerCase().includes(searchTerm) ||
          task.description.toLowerCase().includes(searchTerm)
      );
    }

    filteredTasks.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    const page = params.page || 1;
    const limit = params.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedTasks = filteredTasks.slice(startIndex, endIndex);

    return {
      data: paginatedTasks,
      total: filteredTasks.length,
      page,
      limit,
      totalPages: Math.ceil(filteredTasks.length / limit),
    };
  }

  findById(id: string): Task | undefined {
    return this.tasks.find(task => task.id === id);
  }

  updateById(id: string, updates: Partial<Task>): Task | null {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
      return null;
    }

    this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updates, updatedAt: new Date() };
    return this.tasks[taskIndex];
  }

  deleteById(id: string): boolean {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
      return false;
    }

    this.tasks.splice(taskIndex, 1);
    return true;
  }

  count(): number {
    return this.tasks.length;
  }

  clear(): void {
    this.tasks = [];
  }
}

export const database = new InMemoryDatabase();