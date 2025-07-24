import { TaskModel, ITask } from '../models/Task';
import { TaskStatus, TaskQueryParams, PaginatedResponse, CreateTaskRequest, UpdateTaskRequest } from '../types';

export class Database {
  static async create(taskData: CreateTaskRequest): Promise<ITask> {
    try {
      const task = new TaskModel(taskData);
      return await task.save();
    } catch (error) {
      throw new Error(`Failed to create task: ${error}`);
    }
  }

  static async findAll(params: TaskQueryParams = {}): Promise<PaginatedResponse<ITask>> {
    try {
      const page = params.page || 1;
      const limit = Math.min(params.limit || 10, 100);
      const skip = (page - 1) * limit;
      const query: any = {};
      if (params.status) {
        query.status = params.status;
      }
      if (params.search) {
        query.$or = [
          { title: { $regex: params.search, $options: 'i' } },
          { description: { $regex: params.search, $options: 'i' } },
        ];
      }
      const [tasks, total] = await Promise.all([
        TaskModel.find(query)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean(),
        TaskModel.countDocuments(query),
      ]);
      return {
        data: tasks as ITask[],
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      throw new Error(`Failed to fetch tasks: ${error}`);
    }
  }

  static async findById(id: string): Promise<ITask | null> {
    try {
      return await TaskModel.findOne({ id }).lean();
    } catch (error) {
      throw new Error(`Failed to find task: ${error}`);
    }
  }

  static async updateById(id: string, updates: UpdateTaskRequest): Promise<ITask | null> {
    try {
      return await TaskModel.findOneAndUpdate(
        { id },
        { ...updates, updatedAt: new Date() },
        { new: true, runValidators: true }
      ).lean();
    } catch (error) {
      throw new Error(`Failed to update task: ${error}`);
    }
  }

  static async deleteById(id: string): Promise<boolean> {
    try {
      const result = await TaskModel.deleteOne({ id });
      return result.deletedCount > 0;
    } catch (error) {
      throw new Error(`Failed to delete task: ${error}`);
    }
  }

  static async count(): Promise<number> {
    try {
      return await TaskModel.countDocuments();
    } catch (error) {
      throw new Error(`Failed to count tasks: ${error}`);
    }
  }

  static async clear(): Promise<void> {
    try {
      await TaskModel.deleteMany({});
    } catch (error) {
      throw new Error(`Failed to clear tasks: ${error}`);
    }
  }
}