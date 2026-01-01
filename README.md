# TaskBuddy

A modern, full-stack task management application built with Next.js and Spring Boot, featuring secure authentication, real-time task management, and a beautiful user interface.

## 🚀 Features

- **User Authentication & Authorization**: Secure sign-up, sign-in, password reset, and profile management
- **Task Management**: Create, edit, delete, and organize tasks with status tracking (Todo, In Progress, Completed)
- **Auto Logout**: Automatic session expiration and logout when tokens expire
- **Refresh Token**: Seamless token refresh for uninterrupted user experience
- **Frontend Caching**: Optimized data fetching with React Query
- **Responsive Design**: Modern UI built with Tailwind CSS and shadcn/ui components
- **Email Notifications**: Password reset and signup verification emails

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **NextAuth.js (v4)** - Authentication and session management
- **React Query** - Server state management and data caching
- **React Hook Form + Zod** - Form handling and validation
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Accessible component library built on Radix UI
- **Lucide React** - Icon library

### Backend
- **Spring Boot 3.5.6** - Java-based backend framework
- **Spring Security** - Authentication and authorization
- **Spring Data JPA** - Database abstraction layer
- **JWT** - Token-based authentication (access, refresh, password reset, signup verification)
- **MapStruct** - Type-safe bean mapping
- **Lombok** - Boilerplate code reduction
- **Spring Mail** - Email service integration
- **SpringDoc OpenAPI** - API documentation (Swagger)
- **Maven** - Dependency management

### Database & DevOps
- **PostgreSQL** - Relational database (hosted on Neon)
- **Liquibase** - Database migration and version control
- **Docker** - Containerization for backend service
- **Spring Boot Profiles** - Environment-based configuration (dev/prod)

## 📁 Project Structure

- **`client/`** - Next.js frontend application
- **`server/`** - Spring Boot backend application

## 🔐 Authentication & Security

- **NextAuth.js** with JWT strategy for session management
- **Token Management**: Access tokens (short-lived) and refresh tokens (long-lived)
- **Auto Refresh**: Automatic token refresh before expiration
- **Auto Logout**: Automatic sign-out when tokens expire
- **Password Hashing**: BCrypt for secure password storage
- **CORS**: Configured for allowed origins (localhost:3000 and production URL)
- **Route Protection**: Middleware-based route protection in Next.js

## 🌐 CORS Configuration

CORS is configured globally for all endpoints. Configuration file: `server/src/main/java/com/taskbuddy/config/CorsConfig.java`

- **Allowed Origins**: `http://localhost:3000` (dev), `https://task-buddy-application.vercel.app` (prod)
- **Allowed Methods**: GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD
- **Allowed Headers**: All headers (`*`)
- **Credentials**: Enabled for authentication headers

**Public Endpoints**: `/api/auth/**`, `/api/health-check`, `/swagger-ui/**`
**Protected Endpoints**: `/api/user/**`, `/api/tasks/**` (require JWT authentication)

## ⚙️ Spring Boot Profiles

The application uses YAML profile-based configuration:

- **`application.yaml`** - Base configuration (default profile: `prod`)
- **`application-dev.yaml`** - Development profile
- **`application-prod.yaml`** - Production profile

**Switching Profiles**:
- Environment variable: `SPRING_PROFILES_ACTIVE=dev`
- Command line: `mvn spring-boot:run -Dspring-boot.run.arguments=--spring.profiles.active=dev`
- Edit `application.yaml`: Change `spring.profiles.active`

## 📦 Prerequisites

- **Node.js** (v18+)
- **Yarn** or **npm**
- **Java 17+**
- **Maven 3.8+**
- **Docker** (optional)
- **PostgreSQL** access (Neon account or local)

## 🚀 Getting Started

### 1. Clone the Repository

Clone the repository and navigate to the project directory.

### 2. Backend Setup

Navigate to the `server` directory and create a `.env` file with:

- Database: `DATABASE_URL`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`
- JWT: `JWT_SECRET`, `JWT_ACCESS_TOKEN_EXPIRED_IN_MS`, `JWT_REFRESH_TOKEN_EXPIRED_IN_MS`
- Email: `MAIL_HOST`, `MAIL_PORT`, `MAIL_USERNAME`, `MAIL_PASSWORD`
- Password Reset: `JWT_RESET_PASSWORD_SECRET_KEY`, `JWT_RESET_PASSWORD_TOKEN_EXPIRED_IN_MS`
- Signup Verification: `JWT_SIGNUP_USER_VERIFICATION_TOKEN_SECRET_KEY`, `JWT_SIGNUP_USER_VERIFICATION_TOKEN_EXPIRED_IN_MS`
- Frontend URL: `APP_FRONTEND_LOCAL_BASE_URL` (dev) or `APP_FRONTEND_PRODUCTION_BASE_URL` (prod)

**Run the server:**
- Maven: `mvn clean install && mvn spring-boot:run`
- Docker: `docker build -t taskbuddy-server . && docker run -p 8081:8081 --env-file .env taskbuddy-server`

Server runs on `http://localhost:8081`

### 3. Frontend Setup

Navigate to the `client` directory and create a `.env.local` file with:

- `NEXT_PUBLIC_BASE_API_URL=http://localhost:8081/api`
- `NEXTAUTH_URL=http://localhost:3000`
- `NEXTAUTH_SECRET=your-secret-key-min-32-chars`
- `NEXT_PUBLIC_REFRESH_INTERVAL_SEC=60`

**Install and run:**
- `yarn install` (or `npm install`)
- `yarn dev` (or `npm run dev`)

Frontend runs on `http://localhost:3000`

### 4. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8081/api
- **API Documentation**: http://localhost:8081/swagger-ui.html

## 🔄 Development Workflow

**Terminal 1 - Backend:**
```bash
cd server && mvn spring-boot:run
```

**Terminal 2 - Frontend:**
```bash
cd client && yarn dev
```

## 📝 Key Features

- **Auto Logout**: Automatic logout when tokens expire (handled by SessionGuard component)
- **Refresh Token Flow**: Automatic token refresh before expiration
- **Frontend Caching**: React Query caches API responses with automatic invalidation
- **UI Components**: shadcn/ui components with Tailwind CSS styling

## 🧪 Testing

- **Backend**: `cd server && mvn test`
- **Frontend**: `cd client && yarn lint`

## 🔒 Security Best Practices

- Passwords hashed with BCrypt
- JWT tokens signed with secret keys
- CORS configured for specific origins
- Environment variables for sensitive data
- SQL injection prevention via JPA
- XSS protection via React's built-in escaping

## 🐛 Troubleshooting

- **Database Issues**: Verify Neon credentials and network connectivity
- **Authentication Issues**: Check `NEXTAUTH_SECRET` and JWT configuration
- **Port Conflicts**: Backend (8081), Frontend (3000)

## 📄 License

This project is private and proprietary.

---
