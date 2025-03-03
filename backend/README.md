# StriveSync API

This is the backend API for the StriveSync self-improvement platform. It provides RESTful endpoints for managing users, challenges, tasks, and task completions.

## Technology Stack

- **Framework**: Spring Boot 3.2.4
- **Language**: Java 17
- **Database**: PostgreSQL
- **ORM**: Hibernate/JPA
- **Security**: Spring Security with JWT
- **Documentation**: SpringDoc OpenAPI
- **Build Tool**: Maven

## Prerequisites

- Java 17 or higher
- Maven 3.6 or higher
- PostgreSQL 12 or higher
- Redis (optional, for caching)

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/strivesync.git
   cd strivesync/backend
   ```

2. Configure the database:
   - Create a PostgreSQL database named `strivesync`
   - Update the database configuration in `src/main/resources/application.yml` if needed

3. Build the application:
   ```bash
   mvn clean install
   ```

4. Run the application:
   ```bash
   mvn spring-boot:run
   ```

The API will be available at `http://localhost:8080/api`.

## API Documentation

The API documentation is available at `http://localhost:8080/api/swagger-ui.html` when the application is running.

## Project Structure

- `src/main/java/com/strivesync/`
  - `api/`: REST API controllers, DTOs, and exception handlers
  - `config/`: Configuration classes
  - `domain/`: Domain model entities
  - `repository/`: Data access repositories
  - `security/`: Security-related classes
  - `service/`: Business logic services
  - `util/`: Utility classes

## Database Migration

The application uses Flyway for database migration. Migration scripts are located in `src/main/resources/db/migration`.

## Security

The API uses JWT (JSON Web Token) for authentication. To access protected endpoints, include the JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Available Endpoints

### Authentication

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login and get access token

### Users

- `GET /api/users`: Get all users (admin only)
- `GET /api/users/{id}`: Get user by ID
- `GET /api/users/me`: Get current user
- `PUT /api/users/me`: Update current user

### Challenges

- `GET /api/challenges`: Get all challenges
- `POST /api/challenges`: Create a new challenge
- `GET /api/challenges/{id}`: Get challenge by ID
- `PUT /api/challenges/{id}`: Update challenge
- `DELETE /api/challenges/{id}`: Delete challenge
- `POST /api/challenges/{id}/join`: Join a challenge
- `POST /api/challenges/{id}/leave`: Leave a challenge

### Tasks

- `GET /api/challenges/{challengeId}/tasks`: Get tasks for a challenge
- `POST /api/challenges/{challengeId}/tasks`: Create a new task
- `GET /api/tasks/{id}`: Get task by ID
- `PUT /api/tasks/{id}`: Update task
- `DELETE /api/tasks/{id}`: Delete task

### Task Completions

- `POST /api/tasks/{taskId}/completions`: Complete a task
- `GET /api/users/me/completions`: Get current user's task completions
- `GET /api/tasks/{taskId}/completions`: Get completions for a task

## License

This project is licensed under the MIT License - see the LICENSE file for details. 