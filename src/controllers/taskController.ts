import { Request, Response, NextFunction } from 'express';
import { Database } from '../utils/database';
import { CreateTaskRequest, UpdateTaskRequest, TaskQueryParams, ApiResponse } from '../types';

export class TaskController {
  static async createTask(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const taskData: CreateTaskRequest = req.body;
      const createdTask = await Database.create(taskData);

      const response: ApiResponse<typeof createdTask> = {
        success: true,
        message: 'Task created successfully',
        data: createdTask,
      };

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }


  static async getAllTasks(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const queryParams: TaskQueryParams = req.query as TaskQueryParams;
      const result = await Database.findAll(queryParams);

      const response: ApiResponse<typeof result> = {
        success: true,
        message: 'Tasks retrieved successfully',
        data: result,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getTaskById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const task = await Database.findById(id);

      if (!task) {
        res.status(404).json({
          success: false,
          message: 'Task not found',
          error: `Task with ID ${id} does not exist`,
        });
        return;
      }

      const response: ApiResponse<typeof task> = {
        success: true,
        message: 'Task retrieved successfully',
        data: task,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async updateTask(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const updates: UpdateTaskRequest = req.body;

      const updatedTask = await Database.updateById(id, updates);

      if (!updatedTask) {
        res.status(404).json({
          success: false,
          message: 'Task not found',
          error: `Task with ID ${id} does not exist`,
        });
        return;
      }

      const response: ApiResponse<typeof updatedTask> = {
        success: true,
        message: 'Task updated successfully',
        data: updatedTask,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async deleteTask(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await Database.deleteById(id);

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'Task not found',
          error: `Task with ID ${id} does not exist`,
        });
        return;
      }

      const response: ApiResponse<null> = {
        success: true,
        message: 'Task deleted successfully',
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}