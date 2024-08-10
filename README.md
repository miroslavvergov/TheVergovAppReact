### README for TheVergovAppReact

# The Vergov App React Frontend

This repository contains the front-end of the Vergov Application, a platform for managing users, roles, and content. The front-end is built using React and TypeScript, providing a user interface for interacting with the backend API, which is hosted separately. You can find the server-side code for the application [here](https://github.com/miroslavvergov/TheVergovAppSpring).

## Table of Contents

- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Project Structure](#project-structure)
- [Routing](#routing)
- [Backend Integration](#backend-integration)
- [Scripts](#scripts)
- [License](#license)

## Technologies Used

- **React 18.3.1**
- **TypeScript**
- **Vite** (for bundling and development server)
- **React Router DOM 6.25.0** (for routing)
- **Redux Toolkit** (for state management)
- **React Hook Form** (for form management)
- **Zod** (for schema validation)
- **React Toastify** (for notifications)
- **ESLint** (for linting)
- **Docker** (optional, for containerization)

## Setup Instructions

### Prerequisites

- **Node.js 18.x** or higher
- **npm 9.x** or higher (comes with Node.js)
- **Vite** (already included in dev dependencies)

### Clone the Repository

```bash
git clone https://github.com/yourusername/TheVergovAppReact.git
cd TheVergovAppReact
```

### Install Dependencies

```bash
npm install
```

### Running the Application in Development Mode

To start the development server:

```bash
npm run dev
```

This will start the application on `http://localhost:5173` (or another available port).

### Building for Production

To create a production build:

```bash
npm run build
```

The build output will be generated in the `dist` directory.

### Previewing the Production Build

To preview the production build locally:

```bash
npm run preview
```

This will serve the production build locally for testing purposes.

## Project Structure

- **`src/`**: Main source code directory.
  - **`components/`**: Reusable React components.
  - **`pages/`**: Page components corresponding to different routes.
  - **`hooks/`**: Custom React hooks.
  - **`store/`**: Redux store setup and slices.
  - **`utils/`**: Utility functions.
  - **`App.tsx`**: Main application component.
  - **`index.tsx`**: Entry point for the React application.
  - **`router.tsx`**: Defines the application routes.
  
- **`tsconfig.json`**: TypeScript configuration file.
- **`vite.config.ts`**: Vite configuration file.

## Routing

The application uses `React Router DOM` for client-side routing. The main routes are defined in the `router.tsx` file.

### Key Routes

- **`/login`**: Login page.
- **`/register`**: User registration page.
- **`/resetpassword`**: Password reset page.
- **`/verify/account`**: Account verification page.
- **`/verify/password`**: Password verification page.
- **`/papers`**: Lists all papers (protected route).
- **`/papers/:paperId`**: Displays details of a specific paper.
- **`/users`**: User management page (restricted to certain roles).
- **`/user/profile`**: User profile page.
- **`/user/password`**: Password management page.
- **`/user/settings`**: User settings page.
- **`/user/authorization`**: Authorization settings.
- **`/user/authentication`**: Authentication settings.
- **`*`**: 404 Not Found page.

### Protected and Restricted Routes

- **ProtectedRoute**: Ensures that only authenticated users can access certain routes.
- **Restricted**: Further restricts access based on user roles.

## Backend Integration

The front-end interacts with the backend API hosted on `http://localhost:8085`. The base URL for API requests is defined in the application as `baseUrl`. Key API endpoints include:

- **`/papers`**: CRUD operations for papers.
- **`/users`**: User management.
- **`/auth`**: Authentication and authorization.

## Scripts

- **`npm run dev`**: Starts the development server.
- **`npm run build`**: Builds the project for production.
- **`npm run preview`**: Previews the production build.
- **`npm run lint`**: Runs ESLint to lint the codebase.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
