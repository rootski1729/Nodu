# Task Management API

A robust REST API for managing tasks with full CRUD operations, built with Node.js, Express, and TypeScript. This API provides comprehensive task management functionality with filtering, pagination, search capabilities, and complete API documentation.

## Features

### Core Features
- **Full CRUD Operations** - Create, Read, Update, Delete tasks
- **TypeScript** - Strong typing for better code quality
- **Input Validation** - Comprehensive validation using Zod
- **Error Handling** - Proper error responses and logging
- **Clean Architecture** - Well-organized folder structure

### Advanced Features
- **Search & Filter** - Search by title/description, filter by status
- **Pagination** - Efficient pagination for large datasets
- **Swagger Documentation** - Complete API documentation with examples
- **Security** - Helmet, CORS, input sanitization
- **Code Quality** - ESLint, Prettier, TypeScript strict mode

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
```bash
git clone <your-repository-url>
cd task-management-api
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env file if needed
```

4. **Start development server**
```bash
npm run dev
```

5. **Build for production**
```bash
npm run build
npm start
```

## API Endpoints

### Base URL: `http://localhost:3000/api`

| Method | Endpoint | Description | Query Parameters |
|--------|----------|-------------|------------------|
| GET | `/health` | Health check | - |
| POST | `/tasks` | Create new task | - |
| GET | `/tasks` | Get all tasks | `page`, `limit`, `status`, `search` |
| GET | `/tasks/:id` | Get task by ID | - |
| PUT | `/tasks/:id` | Update task | - |
| DELETE | `/tasks/:id` | Delete task | - |

### Query Parameters for GET /tasks
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10, max: 100)
- `status` (string): Filter by status (PENDING | COMPLETED | IN_PROGRESS)
- `search` (string): Search in title and description

## API Usage Examples

### 1. Create a Task
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete project documentation",
    "description": "Write comprehensive README and API documentation",
    "status": "IN_PROGRESS"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "title": "Complete project documentation",
    "description": "Write comprehensive README and API documentation",
    "status": "IN_PROGRESS",
    "createdAt": "2025-07-24T10:30:00.000Z",
    "updatedAt": "2025-07-24T10:30:00.000Z"
  }
}
```

### 2. Get All Tasks with Pagination
```bash
curl "http://localhost:3000/api/tasks?page=1&limit=5&status=PENDING"
```

**Response:**
```json
{
  "success": true,
  "message": "Tasks retrieved successfully",
  "data": {
    "data": [
      {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "title": "Complete project documentation",
        "description": "Write comprehensive README and API documentation",
        "status": "PENDING",
        "createdAt": "2025-07-24T10:30:00.000Z",
        "updatedAt": "2025-07-24T10:30:00.000Z"
      }
    ],
    "total": 1,
    "page": 1,
    "limit": 5,
    "totalPages": 1
  }
}
```

### 3. Search Tasks
```bash
curl "http://localhost:3000/api/tasks?search=documentation"
```

### 4. Get Task by ID
```bash
curl http://localhost:3000/api/tasks/123e4567-e89b-12d3-a456-426614174000
```

### 5. Update Task
```bash
curl -X PUT http://localhost:3000/api/tasks/123e4567-e89b-12d3-a456-426614174000 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "COMPLETED"
  }'
```

### 6. Delete Task
```bash
curl -X DELETE http://localhost:3000/api/tasks/123e4567-e89b-12d3-a456-426614174000
```

## Documentation

- **Swagger UI**: Visit `http://localhost:3000/api-docs` for interactive API documentation
- **Health Check**: Visit `http://localhost:3000/health` to verify API status

## Development

### Available Scripts
```bash
npm run dev        # Start development server with hot reload
npm run build      # Build for production
npm start          # Start production server
npm run lint       # Run ESLint
npm run lint:fix   # Fix ESLint issues
npm run format     # Format code with Prettier
```

### Project Structure
```
src/
├── controllers/     # Request handlers
├── models/         # Data models
├── routes/         # Route definitions
├── middleware/     # Custom middleware
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
├── swagger/        # API documentation setup
└── app.ts          # Application entry point
```
