# TaskBuddy Client

The frontend application for TaskBuddy, built with Next.js 16, TypeScript, and modern React patterns. This is a full-featured task management application with secure authentication, real-time task management, and a beautiful, responsive user interface.

## 🚀 Features

- **User Authentication**: Secure sign-up, sign-in, password reset with NextAuth.js
- **Task Management**: Create, edit, delete, and organize tasks with status tracking
- **Auto Logout**: Automatic session expiration and logout when tokens expire
- **Token Refresh**: Seamless token refresh for uninterrupted user experience
- **Data Caching**: Optimized data fetching with React Query (TanStack Query)
- **Form Validation**: Type-safe form handling with React Hook Form and Zod
- **Responsive Design**: Modern UI built with Tailwind CSS and shadcn/ui components
- **Route Protection**: Middleware-based route protection for authenticated pages

## 🛠️ Tech Stack

### Core Framework
- **Next.js 16** - React framework with App Router, Server Components, and API routes
- **TypeScript** - Type-safe development
- **React 19** - Latest React with concurrent features

### Authentication & State Management
- **NextAuth.js (v4)** - Authentication and session management
- **React Query (TanStack Query)** - Server state management and data caching
- **Axios** - HTTP client for API requests

### Form Handling & Validation
- **React Hook Form** - Performant form handling
- **Zod** - Schema validation with TypeScript support
- **@hookform/resolvers** - Zod integration for React Hook Form

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality, accessible component library
- **Radix UI** - Accessible component primitives (used by shadcn/ui)
- **Lucide React** - Beautiful icon library
- **React Icons** - Additional icon library
- **class-variance-authority** - Type-safe variant system
- **clsx** & **tailwind-merge** - Conditional class utilities

### Notifications & Dialogs
- **React Toastify** - Toast notifications
- **SweetAlert2** - Beautiful alert dialogs

### Development Tools
- **ESLint** - Code linting
- **Turbopack** - Fast bundler for development

## 📁 Project Structure

```
client/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # Authentication pages (public routes)
│   │   │   ├── signin/         # Sign in page
│   │   │   ├── signup/         # Sign up page
│   │   │   ├── forgot-password/# Forgot password page
│   │   │   ├── reset-password/ # Reset password page
│   │   │   └── SessionGuard.tsx# Session guard component
│   │   ├── (user)/             # Protected user pages
│   │   │   ├── dashboard/      # Dashboard page
│   │   │   ├── profile/        # User profile page
│   │   │   ├── tasks/          # Task management pages
│   │   │   │   ├── add/        # Add new task
│   │   │   │   ├── edit/[id]/  # Edit task
│   │   │   │   └── components/ # Task components
│   │   │   ├── change-password/ # Change password page
│   │   │   └── layout.tsx      # User layout with sidebar
│   │   ├── api/                # API routes
│   │   │   └── auth/           # NextAuth API routes
│   │   │       └── [...nextauth]/ # NextAuth handler
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   ├── globals.css         # Global styles
│   │   ├── loading.tsx         # Loading component
│   │   └── not-found.tsx       # 404 page
│   │
│   ├── components/             # React components
│   │   ├── ui/                 # shadcn/ui components
│   │   │   ├── button.tsx      # Button component
│   │   │   ├── card.tsx        # Card component
│   │   │   ├── input.tsx       # Input component
│   │   │   ├── form.tsx        # Form component
│   │   │   ├── select.tsx      # Select component
│   │   │   └── ...             # Other UI components
│   │   ├── layout/             # Layout components
│   │   │   ├── Navbar.tsx      # Navigation bar
│   │   │   ├── Sidebar.tsx     # Sidebar navigation
│   │   │   └── RootLayout.tsx  # Root layout wrapper
│   │   ├── providers/          # Context providers
│   │   │   ├── AuthProvider.tsx# NextAuth provider
│   │   │   └── QueryProvider.tsx# React Query provider
│   │   ├── InputField.tsx       # Form input field
│   │   ├── PasswordInputField.tsx# Password input
│   │   ├── TextAreaField.tsx    # Textarea field
│   │   ├── DropdownField.tsx    # Dropdown field
│   │   ├── SubmitButton.tsx      # Submit button
│   │   ├── FormErrorMessage.tsx # Form error display
│   │   ├── Loader.tsx           # Loading spinner
│   │   └── ConfirmationDialog.tsx# Confirmation dialog
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── useTasks.ts         # Task management hooks
│   │   ├── useUser.ts          # User management hooks
│   │   ├── useForgotPassword.ts# Forgot password hook
│   │   ├── useResetPassword.ts # Reset password hook
│   │   └── useSidebar.ts       # Sidebar state hook
│   │
│   ├── lib/                    # Utility libraries
│   │   ├── api/                # API client functions
│   │   │   ├── auth.ts         # Authentication API
│   │   │   ├── task.ts         # Task API
│   │   │   └── index.ts        # API exports
│   │   ├── http-client.ts      # Axios HTTP client
│   │   ├── fetcher.ts          # Fetch utility
│   │   ├── query-client.ts     # React Query client
│   │   └── utils.ts            # General utilities
│   │
│   ├── services/               # Business logic services
│   │   ├── taskService.ts      # Task service
│   │   └── userService.ts      # User service
│   │
│   ├── schemas/                # Zod validation schemas
│   │   ├── authValidationSchema.ts# Auth validation
│   │   ├── taskSchema.ts       # Task validation
│   │   └── userSchema.ts       # User validation
│   │
│   ├── types/                  # TypeScript type definitions
│   │   ├── auth.ts             # Authentication types
│   │   ├── task.ts             # Task types
│   │   └── user.ts             # User types
│   │
│   ├── constants/              # Application constants
│   │   ├── auth.ts             # Auth constants
│   │   ├── cache-keys.ts       # React Query cache keys
│   │   ├── sidebar.ts          # Sidebar constants
│   │   ├── task.ts             # Task constants
│   │   └── user.ts             # User constants
│   │
│   ├── actions/                # Server actions
│   │   └── authActions.ts     # Auth actions
│   │
│   ├── middleware.ts           # Next.js middleware for route protection
│   └── utils/                  # Additional utilities
│
├── public/                     # Static assets
│   └── images/                 # Image files
│
├── components.json             # shadcn/ui configuration
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript configuration
├── next.config.ts              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── postcss.config.mjs          # PostCSS configuration
```

## 🔐 Authentication Flow

### NextAuth.js Integration

The application uses NextAuth.js v4 with a custom credentials provider:

- **JWT Strategy**: Token-based session management
- **Credentials Provider**: Custom authentication with email/password
- **Token Refresh**: Automatic refresh token handling
- **Session Management**: Server-side session with client-side state

### Authentication Pages

- **Sign In** (`/signin`) - User login with email and password
- **Sign Up** (`/signup`) - New user registration
- **Forgot Password** (`/forgot-password`) - Request password reset
- **Reset Password** (`/reset-password`) - Reset password with token

### Protected Routes

All user routes are protected by middleware:
- `/dashboard` - User dashboard
- `/profile` - User profile management
- `/tasks` - Task management
- `/change-password` - Change password

### Auto Logout

The application implements automatic logout when:
- Access token expires and refresh token is invalid
- Refresh token expires
- Server returns 401 Unauthorized

Handled by `SessionGuard` component that monitors session errors.

## 🎨 UI Components

### shadcn/ui Components

The application uses shadcn/ui components with custom styling:

- **Button** - Multiple variants (primary, secondary, success, danger, outline, ghost)
- **Card** - Container for content sections
- **Input** - Text input fields
- **Form** - Form wrapper with React Hook Form integration
- **Select** - Dropdown select component
- **Textarea** - Multi-line text input
- **Avatar** - User avatar display
- **Badge** - Status badges
- **Table** - Data tables
- **Dropdown Menu** - Context menus
- **Scroll Area** - Custom scrollable containers
- **Collapsible** - Expandable sections
- **Spinner** - Loading indicators

### Custom Components

- **InputField** - Form input with validation
- **PasswordInputField** - Password input with show/hide toggle
- **TextAreaField** - Textarea with validation
- **DropdownField** - Select dropdown with validation
- **SubmitButton** - Submit button with loading state
- **FormErrorMessage** - Error message display
- **Loader** - Loading spinner
- **ConfirmationDialog** - Confirmation dialogs

## 📡 API Integration

### HTTP Client

The application uses Axios for API requests:

- **Base URL**: Configured via `NEXT_PUBLIC_BASE_API_URL`
- **Interceptors**: Automatic token injection in Authorization header
- **Error Handling**: Centralized error handling

### API Endpoints

**Authentication:**
- `POST /api/auth/registration` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

**User:**
- `GET /api/user` - Get user profile
- `PUT /api/user/{userId}` - Update user profile
- `POST /api/user/{userId}/change-password` - Change password

**Tasks:**
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/{taskId}` - Get task by ID
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/{taskId}` - Update task
- `DELETE /api/tasks/{taskId}` - Delete task

## 🔄 State Management

### React Query (TanStack Query)

Used for server state management:

- **Query Caching**: Automatic caching of API responses
- **Stale Time Management**: Configurable cache invalidation
- **Background Refetching**: Automatic data synchronization
- **Optimistic Updates**: Immediate UI updates with rollback on error
- **Retry Logic**: Automatic retry on failed requests

### Cache Keys

Centralized cache keys in `constants/cache-keys.ts` for consistent cache management.

## 📝 Form Handling

### React Hook Form + Zod

All forms use React Hook Form with Zod validation:

- **Type Safety**: Full TypeScript support
- **Validation**: Schema-based validation with Zod
- **Error Handling**: Automatic error display
- **Performance**: Optimized re-renders

### Validation Schemas

- `authValidationSchema.ts` - Authentication form validation
- `taskSchema.ts` - Task form validation
- `userSchema.ts` - User form validation

## 🛣️ Routing & Navigation

### App Router Structure

- **Route Groups**: `(auth)` and `(user)` for organization
- **Dynamic Routes**: `/tasks/edit/[id]` for dynamic task editing
- **Middleware**: Route protection and redirects
- **Layouts**: Nested layouts for different sections

### Middleware

The `middleware.ts` file handles:
- Route protection for authenticated pages
- Redirects for authenticated/unauthenticated users
- Token validation

## 🎯 Custom Hooks

- **useTasks** - Task management operations
- **useUser** - User profile operations
- **useForgotPassword** - Forgot password flow
- **useResetPassword** - Reset password flow
- **useSidebar** - Sidebar state management

## 📦 Prerequisites

- **Node.js** (v18 or higher)
- **Yarn** or **npm**
- Backend API running on `http://localhost:8081` (or configured URL)

## 🚀 Getting Started

### 1. Install Dependencies

```bash
yarn install
# or
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the `client` directory:

```env
# API Configuration
NEXT_PUBLIC_BASE_API_URL=http://localhost:8081/api

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-min-32-characters

# Session Refresh Interval (in seconds)
NEXT_PUBLIC_REFRESH_INTERVAL_SEC=60
```

### 3. Run Development Server

```bash
yarn dev
# or
npm run dev
```

The application will start on `http://localhost:3000`

### 4. Build for Production

```bash
yarn build
# or
npm run build
```

### 5. Start Production Server

```bash
yarn start
# or
npm start
```

## 🔧 Available Scripts

- **`yarn dev`** - Start development server with Turbopack
- **`yarn build`** - Build for production with Turbopack
- **`yarn start`** - Start production server
- **`yarn lint`** - Run ESLint

## 🌐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_BASE_API_URL` | Backend API base URL | Yes |
| `NEXTAUTH_URL` | Frontend URL for NextAuth | Yes |
| `NEXTAUTH_SECRET` | Secret key for NextAuth (min 32 chars) | Yes |
| `NEXT_PUBLIC_REFRESH_INTERVAL_SEC` | Session refresh interval in seconds | No (default: 60) |

## 🎨 Styling

### Tailwind CSS

The application uses Tailwind CSS v4 with:
- **CSS Variables**: For theming
- **Custom Utilities**: Extended utilities for the application
- **Responsive Design**: Mobile-first approach

### shadcn/ui Configuration

Configured in `components.json`:
- **Style**: New York variant
- **Base Color**: Neutral
- **CSS Variables**: Enabled for theming
- **Icon Library**: Lucide React

## 🧪 Development

### Code Structure

- **TypeScript**: Full type safety throughout
- **ESLint**: Code linting with Next.js config
- **Component Organization**: Feature-based organization
- **Reusable Components**: Shared components in `components/` directory

### Best Practices

- **Type Safety**: All components and functions are typed
- **Error Handling**: Comprehensive error handling
- **Loading States**: Loading indicators for async operations
- **Form Validation**: Client-side validation before API calls
- **Accessibility**: ARIA attributes and keyboard navigation

## 🐛 Troubleshooting

### Common Issues

**CORS Errors:**
- Verify backend CORS configuration includes frontend URL
- Check `NEXT_PUBLIC_BASE_API_URL` is correct

**Authentication Issues:**
- Verify `NEXTAUTH_SECRET` is set correctly
- Check `NEXTAUTH_URL` matches your frontend URL
- Ensure backend is running and accessible

**Build Errors:**
- Clear `.next` directory and rebuild
- Check TypeScript errors
- Verify all environment variables are set

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [React Query Documentation](https://tanstack.com/query)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [React Hook Form Documentation](https://react-hook-form.com)
- [Zod Documentation](https://zod.dev)

## 📄 License

This project is private and proprietary.

---

**Built with ❤️ using Next.js, TypeScript, and modern React patterns**
