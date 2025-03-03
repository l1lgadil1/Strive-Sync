# StriveSync API

Backend API for StriveSync - A platform for group self-development challenges.

## Getting Started

### Prerequisites

- Java 17 or higher
- Maven
- PostgreSQL
- Redis (optional, for caching)

### Running the Application

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/strivesync.git
   cd strivesync/backend
   ```

2. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```

3. The backend will start on `http://localhost:8080/api`

## API Documentation

The API documentation is available through Swagger UI. After starting the application, you can access it at:

```
http://localhost:8080/api/swagger-ui/index.html
```

### OpenAPI Specification

The OpenAPI specification is available at:

```
http://localhost:8080/api/v3/api-docs
```

You can also download the specification in JSON format and import it into tools like Postman.

## Using Swagger UI

Swagger UI provides a user-friendly interface to explore and test the API endpoints:

1. **Authentication**: To test secured endpoints, you need to:
   - First, use the `/api/auth/login` endpoint to get a JWT token
   - Click the "Authorize" button at the top of the page
   - Enter your JWT token in the format: `Bearer your_token_here`
   - Click "Authorize" to apply the token to all subsequent requests

2. **Exploring Endpoints**:
   - Endpoints are grouped by tags (Authentication, Challenges, etc.)
   - Click on an endpoint to expand it and see details
   - Parameters, request bodies, and responses are documented
   - Required fields are marked with an asterisk (*)

3. **Testing Endpoints**:
   - Fill in the required parameters
   - Click "Execute" to send the request
   - View the response status, headers, and body

## Available Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate and get JWT token

### Challenges

- `GET /challenges` - Get all challenges
- `GET /challenges/{id}` - Get challenge by ID
- `POST /challenges` - Create a new challenge (requires authentication)
- `POST /challenges/{id}/join` - Join a challenge (requires authentication)

## Database Configuration

The application uses PostgreSQL with the following default configuration:
- **Database**: strivesync
- **Username**: strivesync
- **Password**: strivesync
- **Port**: 5432

You can modify these settings in the `application.yml` file.

## Security

The API uses JWT (JSON Web Token) for authentication. Protected endpoints require a valid JWT token in the Authorization header:

```
Authorization: Bearer your_token_here
```

## Caching

The application uses Redis and Hibernate second-level cache for improved performance. Redis should be running on localhost:6379 by default.

## Development

### Building the Project

```bash
mvn clean install
```

### Running Tests

```bash
mvn test
```

## License

This project is licensed under the MIT License - see the LICENSE file for details. 