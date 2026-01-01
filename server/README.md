# TaskBuddy Server

The backend API for TaskBuddy, built with Spring Boot 3.5.6, providing a robust RESTful API for task management with secure authentication, JWT token management, and database persistence.

## 🚀 Features

- **RESTful API**: Clean, well-documented REST endpoints
- **JWT Authentication**: Secure token-based authentication with access and refresh tokens
- **User Management**: User registration, login, profile management, and password reset
- **Task Management**: CRUD operations for tasks with status and priority tracking
- **Email Service**: Automated emails for password reset and signup verification
- **Database Migrations**: Liquibase for version-controlled database schema management
- **API Documentation**: Swagger/OpenAPI documentation
- **CORS Configuration**: Cross-origin resource sharing for frontend integration
- **Security**: Spring Security with JWT authentication filter
- **Profile-based Configuration**: Environment-specific configurations (dev/prod)

## 🛠️ Tech Stack

### Core Framework
- **Spring Boot 3.5.6** - Java-based backend framework
- **Java 17** - Programming language
- **Maven** - Dependency management and build tool

### Security & Authentication
- **Spring Security** - Authentication and authorization framework
- **JWT (JSON Web Tokens)** - Token-based authentication
  - **JJWT 0.12.6** - JWT library (api, impl, jackson)
  - Access tokens for API authentication
  - Refresh tokens for token renewal
  - Password reset tokens
  - Signup verification tokens

### Database & Persistence
- **Spring Data JPA** - Database abstraction layer
- **PostgreSQL** - Relational database (hosted on Neon)
- **Liquibase** - Database migration and version control
- **Hibernate** - JPA implementation (via Spring Data JPA)

### Data Mapping & Validation
- **MapStruct 1.6.1** - Type-safe bean mapping (DTOs to Entities)
- **Spring Validation** - Request validation
- **Lombok** - Boilerplate code reduction

### API Documentation
- **SpringDoc OpenAPI 2.8.13** - Swagger UI integration

### Email Service
- **Spring Mail** - Email service integration
- HTML email templates for password reset and signup verification

### Configuration
- **Spring Dotenv** - Environment variable management
- **YAML Configuration** - Profile-based configuration files

### DevOps
- **Docker** - Containerization support
- **Maven Plugins** - Spring Boot Maven plugin, Liquibase plugin

## 📁 Project Structure

```
server/
├── src/
│   ├── main/
│   │   ├── java/com/taskbuddy/
│   │   │   ├── config/              # Configuration classes
│   │   │   │   ├── CorsConfig.java  # CORS configuration
│   │   │   │   ├── JwtConfig.java   # JWT configuration
│   │   │   │   ├── OpenAPIConfig.java # Swagger/OpenAPI config
│   │   │   │   └── SecurityConfig.java # Spring Security config
│   │   │   │
│   │   │   ├── controllers/         # REST API controllers
│   │   │   │   ├── AuthController.java      # Authentication endpoints
│   │   │   │   ├── UserController.java      # User management endpoints
│   │   │   │   ├── TaskController.java      # Task management endpoints
│   │   │   │   └── HealthCheckController.java # Health check endpoint
│   │   │   │
│   │   │   ├── services/           # Business logic services
│   │   │   │   ├── AuthService.java              # Authentication logic
│   │   │   │   ├── UserService.java              # User management logic
│   │   │   │   ├── TaskService.java              # Task management logic
│   │   │   │   ├── JwtService.java               # JWT token operations
│   │   │   │   ├── UserDetailsService.java      # Spring Security user details
│   │   │   │   ├── PasswordResetEmailService.java # Password reset emails
│   │   │   │   ├── SignupEmailService.java       # Signup verification emails
│   │   │   │   ├── ResetPasswordRecordsService.java # Reset password records
│   │   │   │   └── SignupVerificationRecordsService.java # Signup verification records
│   │   │   │
│   │   │   ├── repositories/        # Data access layer (JPA repositories)
│   │   │   │   ├── UserRepository.java
│   │   │   │   ├── TaskRepository.java
│   │   │   │   ├── ResetPasswordRecordsRepository.java
│   │   │   │   └── SignupVerificationRecordsRepository.java
│   │   │   │
│   │   │   ├── entities/           # JPA entities (database models)
│   │   │   │   ├── BaseEntity.java          # Base entity with common fields
│   │   │   │   ├── User.java                # User entity
│   │   │   │   ├── Task.java                # Task entity
│   │   │   │   ├── ResetPasswordRecords.java # Password reset records
│   │   │   │   └── SignupVerificationRecords.java # Signup verification records
│   │   │   │
│   │   │   ├── dtos/                # Data Transfer Objects
│   │   │   │   ├── auth/            # Authentication DTOs
│   │   │   │   │   ├── RegistrationRequest.java
│   │   │   │   │   ├── LoginRequest.java
│   │   │   │   │   ├── LoginResponse.java
│   │   │   │   │   ├── RefreshTokenRequest.java
│   │   │   │   │   ├── RefreshTokenResponse.java
│   │   │   │   │   ├── ForgotPasswordRequest.java
│   │   │   │   │   ├── ResetPasswordRequest.java
│   │   │   │   │   ├── ResetPasswordLinkValidateRequest.java
│   │   │   │   │   ├── SignupUserVerificationLinkValidateRequest.java
│   │   │   │   │   └── LoginWithEmailVerificationTokenRequest.java
│   │   │   │   ├── user/            # User DTOs
│   │   │   │   │   ├── UserDto.java
│   │   │   │   │   ├── UserUpdateRequest.java
│   │   │   │   │   └── ChangePasswordRequest.java
│   │   │   │   ├── task/            # Task DTOs
│   │   │   │   │   ├── TaskDto.java
│   │   │   │   │   └── TaskCreatingRequest.java
│   │   │   │   └── common/          # Common DTOs
│   │   │   │       └── ApiResponse.java
│   │   │   │
│   │   │   ├── mappers/             # MapStruct mappers
│   │   │   │   ├── UserMapper.java  # User entity-DTO mapping
│   │   │   │   └── TaskMapper.java  # Task entity-DTO mapping
│   │   │   │
│   │   │   ├── filters/             # Servlet filters
│   │   │   │   ├── JwtAuthenticationFilter.java # JWT authentication filter
│   │   │   │   └── LoggingFilter.java # Request logging filter
│   │   │   │
│   │   │   ├── utils/               # Utility classes
│   │   │   │   └── JwtUtils.java    # JWT utility methods
│   │   │   │
│   │   │   ├── enums/               # Enumeration types
│   │   │   │   ├── TaskStatus.java  # Task status enum
│   │   │   │   └── TaskPriority.java # Task priority enum
│   │   │   │
│   │   │   ├── exeptions/           # Custom exceptions
│   │   │   │   ├── GlobalException.java      # Global exception handler
│   │   │   │   ├── NotFoundException.java    # Resource not found
│   │   │   │   ├── AuthenticationException.java # Authentication errors
│   │   │   │   └── AuthorizationException.java # Authorization errors
│   │   │   │
│   │   │   ├── payload/             # Response builders
│   │   │   │   └── ApiResponseBuilder.java # API response builder
│   │   │   │
│   │   │   └── ServerApplication.java # Main application class
│   │   │
│   │   └── resources/
│   │       ├── application.yaml          # Base configuration
│   │       ├── application-dev.yaml        # Development profile
│   │       ├── application-prod.yaml       # Production profile
│   │       ├── db/changelog/               # Liquibase migrations
│   │       │   ├── db.changelog-master.yaml # Master changelog
│   │       │   ├── liquibase.properties    # Liquibase config
│   │       │   └── data/
│   │       │       └── V1__Initial_table_creation_query.sql # Initial schema
│   │       └── templates/                  # Email templates
│   │           ├── password-reset-email.html
│   │           └── signup-email.html
│   │
│   └── test/                        # Test classes
│
├── Dockerfile                       # Docker configuration
├── pom.xml                          # Maven dependencies
└── mvnw / mvnw.cmd                 # Maven wrapper
```

## 🔐 Security Architecture

### Spring Security Configuration

- **Stateless Authentication**: JWT-based stateless authentication
- **Security Filter Chain**: Custom filter chain with JWT authentication filter
- **CORS Configuration**: Global CORS setup for frontend integration
- **Password Encoding**: BCrypt password hashing
- **Route Protection**: Public and protected endpoint configuration

### JWT Token Management

**Token Types:**
1. **Access Token**: Short-lived token for API authentication
2. **Refresh Token**: Long-lived token for obtaining new access tokens
3. **Password Reset Token**: Token for password reset flow
4. **Signup Verification Token**: Token for email verification

**Token Configuration:**
- Configurable expiration times via environment variables
- Separate secret keys for different token types
- Token validation and parsing utilities

### Authentication Flow

1. User registers → Email verification token sent
2. User verifies email → Can login with verification token
3. User logs in → Receives access token + refresh token
4. Access token expires → Use refresh token to get new access token
5. Refresh token expires → User must login again

## 📡 API Endpoints

### Authentication Endpoints (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/registration` | Register new user | No |
| POST | `/api/auth/validate-signup-user-verification-link` | Validate signup token | No |
| POST | `/api/auth/login-with-email-verification-token` | Login with verification token | No |
| POST | `/api/auth/login` | User login | No |
| POST | `/api/auth/refresh` | Refresh access token | No |
| POST | `/api/auth/forgot-password` | Request password reset | No |
| POST | `/api/auth/validate-reset-password-link` | Validate reset token | No |
| POST | `/api/auth/reset-password` | Reset password | No |

### User Endpoints (`/api/user`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/user` | Get user profile | Yes |
| PUT | `/api/user/{userId}` | Update user profile | Yes |
| DELETE | `/api/user/{userId}` | Delete user account | Yes |
| POST | `/api/user/{userId}/change-password` | Change password | Yes |

### Task Endpoints (`/api/tasks`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/tasks` | Get all tasks for user | Yes |
| GET | `/api/tasks/{taskId}` | Get task by ID | Yes |
| POST | `/api/tasks` | Create new task | Yes |
| PUT | `/api/tasks/{taskId}` | Update task | Yes |
| DELETE | `/api/tasks/{taskId}` | Delete task | Yes |

### Health Check (`/api/health-check`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/health-check` | Server health status | No |

### API Documentation

- **Swagger UI**: `http://localhost:8081/swagger-ui.html`
- **OpenAPI JSON**: `http://localhost:8081/v3/api-docs`

## 🗄️ Database Schema

### Entities

**User:**
- id, email, password, fullname, createdAt, updatedAt

**Task:**
- id, title, description, status, priority, userId, createdAt, updatedAt

**ResetPasswordRecords:**
- id, userEmail, token, expiresAt, createdAt, updatedAt

**SignupVerificationRecords:**
- id, userEmail, token, expiresAt, createdAt, updatedAt

### Database Migrations

Liquibase manages all database schema changes:
- **Location**: `src/main/resources/db/changelog/`
- **Master Changelog**: `db.changelog-master.yaml`
- **Automatic Execution**: Migrations run on application startup
- **Manual Execution**: `mvn liquibase:update`

## ⚙️ Configuration

### Application Profiles

**Base Configuration** (`application.yaml`):
- Application name
- JPA settings
- Liquibase configuration
- Default active profile: `prod`

**Development Profile** (`application-dev.yaml`):
- Database connection (via environment variables)
- JWT configuration
- Email service settings
- Frontend URL: `APP_FRONTEND_LOCAL_BASE_URL`
- Server port: 8081

**Production Profile** (`application-prod.yaml`):
- Database connection (via environment variables)
- JWT configuration
- Email service settings
- Frontend URL: `APP_FRONTEND_PRODUCTION_BASE_URL`
- Server port: 8081

### Environment Variables

Create a `.env` file in the `server` directory:

```env
# Database Configuration (Neon PostgreSQL)
DATABASE_URL=jdbc:postgresql://your-neon-host:5432/your-database
DATABASE_USERNAME=your-username
DATABASE_PASSWORD=your-password

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-min-256-bits
JWT_ACCESS_TOKEN_EXPIRED_IN_MS=3600000
JWT_REFRESH_TOKEN_EXPIRED_IN_MS=604800000

# Email Configuration
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password

# Password Reset Token
JWT_RESET_PASSWORD_SECRET_KEY=your-reset-password-secret
JWT_RESET_PASSWORD_TOKEN_EXPIRED_IN_MS=3600000

# Signup Verification Token
JWT_SIGNUP_USER_VERIFICATION_TOKEN_SECRET_KEY=your-signup-verification-secret
JWT_SIGNUP_USER_VERIFICATION_TOKEN_EXPIRED_IN_MS=86400000

# Frontend URL (Development)
APP_FRONTEND_LOCAL_BASE_URL=http://localhost:3000

# Frontend URL (Production)
APP_FRONTEND_PRODUCTION_BASE_URL=https://your-production-domain.com
```

## 📦 Prerequisites

- **Java 17** or higher
- **Maven 3.8+**
- **PostgreSQL** access (Neon account or local PostgreSQL)
- **Docker** (optional, for containerized deployment)

## 🚀 Getting Started

### 1. Configure Environment Variables

Create a `.env` file in the `server` directory with all required environment variables (see above).

### 2. Run Database Migrations

Migrations run automatically on startup. To run manually:

```bash
mvn liquibase:update
```

### 3. Build the Application

```bash
mvn clean install
```

### 4. Run the Application

**Development Profile:**
```bash
mvn spring-boot:run -Dspring-boot.run.arguments=--spring.profiles.active=dev
```

**Production Profile (Default):**
```bash
mvn spring-boot:run
```

**Using Environment Variable:**
```bash
export SPRING_PROFILES_ACTIVE=dev
mvn spring-boot:run
```

The server will start on `http://localhost:8081`

### 5. Access API Documentation

- **Swagger UI**: http://localhost:8081/swagger-ui.html
- **API Base URL**: http://localhost:8081/api

## 🐳 Docker Deployment

### Build Docker Image

```bash
docker build -t taskbuddy-server .
```

### Run Docker Container

```bash
docker run -p 8081:8081 -e SPRING_PROFILES_ACTIVE=dev --env-file .env taskbuddy-server
```

### Dockerfile Details

- **Build Stage**: Uses Maven to build the Spring Boot application
- **Runtime Stage**: Uses OpenJDK to run the JAR file
- **Port**: Exposes port 8081
- **JAR File**: `taskbuddy.jar`

## 🔧 Available Maven Commands

- **`mvn clean`** - Clean build directory
- **`mvn compile`** - Compile source code
- **`mvn test`** - Run tests
- **`mvn package`** - Build JAR file
- **`mvn install`** - Install to local repository
- **`mvn spring-boot:run`** - Run Spring Boot application
- **`mvn liquibase:update`** - Run database migrations

## 🧪 Testing

### Run Tests

```bash
mvn test
```

### Test Coverage

Tests are located in `src/test/java/com/taskbuddy/`

## 📧 Email Service

### Email Templates

HTML email templates are located in `src/main/resources/templates/`:
- `password-reset-email.html` - Password reset email
- `signup-email.html` - Signup verification email

### Email Configuration

Configure email settings in environment variables:
- `MAIL_HOST` - SMTP server host
- `MAIL_PORT` - SMTP server port
- `MAIL_USERNAME` - Email username
- `MAIL_PASSWORD` - Email password (app password for Gmail)

## 🔒 Security Best Practices

- **Password Hashing**: BCrypt with salt rounds
- **JWT Tokens**: Signed with secret keys, configurable expiration
- **CORS**: Configured for specific origins
- **SQL Injection Prevention**: JPA parameterized queries
- **Input Validation**: Request DTO validation
- **Environment Variables**: Sensitive data in environment variables
- **HTTPS**: Use HTTPS in production

## 🐛 Troubleshooting

### Database Connection Issues

- Verify Neon database credentials
- Check network connectivity
- Ensure database is accessible from your IP
- Check `DATABASE_URL` format: `jdbc:postgresql://host:port/database`

### JWT Token Issues

- Verify `JWT_SECRET` is set correctly
- Check token expiration times
- Ensure secret keys match between environments

### Email Service Issues

- Verify SMTP credentials
- Check email service provider settings
- For Gmail, use app password instead of regular password

### Port Conflicts

- Default port: 8081
- Change port in `application.yaml` or via environment variable: `SERVER_PORT`

## 📚 API Response Format

All API responses follow a consistent format:

```json
{
  "success": true,
  "message": "Operation successful",
  "payload": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message",
  "payload": null
}
```

## 🔄 Development Workflow

1. **Start Database**: Ensure PostgreSQL is running
2. **Set Environment Variables**: Create `.env` file
3. **Run Migrations**: Automatic on startup or manual via Maven
4. **Start Server**: `mvn spring-boot:run`
5. **Test API**: Use Swagger UI or API client
6. **Check Logs**: Monitor application logs for errors

## 📄 License

This project is private and proprietary.

---

**Built with ❤️ using Spring Boot and Java**

