# Store Rating Platform - Full-Stack Web Application

A comprehensive full-stack web application designed as a platform for users to submit and view ratings for various stores. The application features a secure, role-based access control system, catering to three distinct user types: System Administrators, Store Owners, and Normal Users. The project is built with a modern technology stack, featuring a robust RESTful API on the backend and a dynamic, responsive frontend interface styled to professional standards using Tailwind CSS and Shadcn/ui.

## ✨ Core Features

### 👤 Normal User
- **Authentication**: Secure signup and login functionality.
- **Password Management**: Ability to update their own password after logging in.
- **View Stores**: View a complete, paginated list of all stores.
- **Search & Sort**: Dynamically search for stores by name and sort the list by name or creation date.
- **Rate Stores**: Submit a rating (from 1 to 5) for any store via an interactive modal.
- **Update Ratings**: Modify their existing rating for any store.
- **View Personal Ratings**: The store list clearly displays the user's own rating for each store alongside the overall average.

### 👑 Store Owner
- **Authentication**: Secure login and password management.
- **Private Dashboard**: Access to a private, role-protected dashboard for their specific store.
- **View Average Rating**: The dashboard prominently displays the store's current overall rating.
- **View Raters**: See a detailed table of every user who has submitted a rating for their store.

### 🛠️ System Administrator
- **Authentication**: Secure login and password management.
- **Private Dashboard**: Access to a comprehensive, role-protected admin dashboard.
- **Platform Analytics**: View key platform metrics at a glance, including total users, total stores, and total ratings submitted.
- **User Management**: 
    - View detailed, scrollable, and sortable tables for each user role (Admins, Owners, Users).
    - Create new users and assign them a specific role (`ADMIN`, `OWNER`, or `USER`) via dedicated modals.
- **Store Management**:
    - View a complete, sortable list of all stores on the platform.
    - Create new stores and assign them to an existing owner from a dropdown list.

## 🚀 Tech Stack

| Category        | Technology / Library                  |
|-----------------|-------------------------------------|
| Backend         | Node.js, Express.js                  |
| Database        | MySQL                                |
| ORM             | Prisma                               |
| Frontend        | React (Vite)                         |
| Styling         | Tailwind CSS, Shadcn/ui              |
| Routing         | React Router DOM                     |
| API Client      | Axios                                |
| Security        | JWT for authentication, bcrypt.js    |
| Validation      | express-validator                     |

## 📂 Project Structure.(This might changes based on the requirements)
```
Rating_Store/  
server/src/
├── api/                   # Main API router configuration
├── config/                # Database (Prisma) and environment setup
├── controllers/           # Handles request/response logic
├── middleware/            # Authentication & role checks
├── routes/                # Defines API endpoints for each resource
├── services/              # Core business logic and database interactions
└── app.js / server.js     # Entry points

client/src/
├── api/           # Axios instance and API call functions
├── components/    # Reusable UI components (Layouts, Skeletons, Shadcn/ui)
├── features/      # Components for major features (Auth, Admin, Owner, etc.)
├── hooks/         # Custom React hooks (e.g., useAuth)
├── lib/           # Utility functions
├── pages/         # Top-level page components
└── router/        # React Router configuration including Protected Routes
```

## 📋 API Endpoints

| Method | Endpoint                        | Description                          | Access Control |
|--------|---------------------------------|--------------------------------------|----------------|
| POST   | /api/auth/signup                | Register a new Normal User            | Public         |
| POST   | /api/auth/login                 | Log in any user to receive a JWT      | Public         |
| GET    | /api/users/me                   | Get the profile of logged-in user    | Authenticated  |
| PATCH  | /api/users/me/password          | Update logged-in user's password     | Authenticated  |
| GET    | /api/stores                     | Get list of all stores                | Authenticated  |
| POST   | /api/stores/:storeId/rate       | Submit/update rating for store       | USER only      |
| GET    | /api/stores/dashboard           | Store owner dashboard data           | OWNER only     |
| GET    | /api/admin/dashboard/analytics  | Platform-wide statistics             | ADMIN only     |
| GET    | /api/admin/users                | List all users                        | ADMIN only     |
| POST   | /api/users                      | Create new user with specific role   | ADMIN only     |
| POST   | /api/stores                     | Create new store                      | ADMIN only     |

## 🛠️ Getting Started

### Prerequisites
- Node.js v18+  
- npm v8+  
- Running MySQL database

### Backend & Frontend Setup (all in one block)
```bash
# Backend
cd server
npm install
# Create .env file with DATABASE_URL and JWT_SECRET
npx prisma migrate dev
npm start
# Backend runs at http://localhost:3001

# Frontend
cd ../client
npm install
# Create .env file with VITE_API_BASE_URL=http://localhost:3001/api
npm run dev
# Frontend runs at http://localhost:5173

## ✅ Core Features

- Role-based authentication and authorization  
- Users can rate stores (1-5), update ratings, and view personal and overall ratings  
- Store owners can view their store’s average rating and all raters  
- System administrators can manage users, stores, and view platform analytics  
- Secure password management with `bcrypt.js` and JWT authentication  
- Dynamic search, sorting, and pagination for both stores and users  

## 👤 Author

**Jay Arya**  
- **Email:** [jayarya.work@gmail.com](mailto:jayarya.work@gmail.com)  
- **GitHub:** [@Jay-736-Github](https://github.com/Jay-736-Github)
