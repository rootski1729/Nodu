import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { TaskStatus } from '../types';

export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().min(1, 'Description is required').max(500, 'Description must be less than 500 characters'),
  status: z.nativeEnum(TaskStatus).optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  description: z.string().min(1).max(500).optional(),
  status: z.nativeEnum(TaskStatus).optional(),
});

export const taskQuerySchema = z.object({
  page: z.string().regex(/^\d+$/).transform(Number).optional(),
  limit: z.string().regex(/^\d+$/).transform(Number).optional(),
  status: z.nativeEnum(TaskStatus).optional(),
  search: z.string().optional(),
});

export const uuidSchema = z.string().uuid('Invalid task ID format');

export const validateRequest = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      if (req.method === 'GET') {
        const parsedQuery = schema.parse(req.query);
        req.query = parsedQuery as typeof req.query;
      } else {
        req.body = schema.parse(req.body);
      }
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: 'Validation error',
          error: error.issues.map(err => `${err.path.join('.')}: ${err.message}`).join(', '),
        });
        return;
      }
      next(error);
    }
  };
};

export const validateUUID = (req: Request, res: Response, next: NextFunction): void => {
  try {
    uuidSchema.parse(req.params.id);
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid task ID format',
      error: 'Task ID must be a valid UUID',
    });
  }
};