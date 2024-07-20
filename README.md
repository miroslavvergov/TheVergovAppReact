
# The Vergov App

## Overview

**Project Name** is a modern web application designed to [describe main purpose and functionality of the app]. This application provides users with [key features], utilizing React for the frontend and Redux Toolkit for state management.

## Features

- **User Management**: Register, login, and manage user profiles with support for roles and multi-factor authentication.
- **Paper Management**: Upload, download, and manage paper documents.
- **Secure Authentication**: Encrypted password reset and verification processes.
- **Toast Notifications**: User-friendly notifications for success, errors, and information.

## Technologies Used

- **Frontend**: React, TypeScript, Redux Toolkit, React Toastify
- **Backend**: [Specify the backend technology if relevant, e.g., Node.js, Spring Boot]
- **API**: RESTful API with endpoints for user and paper management
- **State Management**: Redux Toolkit
- **Styling**: [Specify if applicable, e.g., CSS, SCSS, Material-UI]

## Installation

### Prerequisites

- Node.js (v14.x or later)
- npm or Yarn

### Clone the Repository

```bash
git clone https://github.com/your-username/your-repository.git
cd your-repository
```

### Install Dependencies

```bash
npm install
# or
yarn install
```

### Configure Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```env
REACT_APP_API_BASE_URL=http://localhost:8085
```

### Running the Application

To start the development server:

```bash
npm start
# or
yarn start
```

The application will be available at `http://localhost:3000`.

### Running Tests

To run unit and integration tests:

```bash
npm test
# or
yarn test
```

### Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The production build will be available in the `build` directory.

## Usage

### API Endpoints

- **User Management**:
  - `GET /profile`: Fetch user profile
  - `POST /login`: Log in user
  - `POST /register`: Register new user
  - `POST /reset-password`: Request password reset
  - `POST /reset-password/reset`: Reset password
  - `PATCH /update`: Update user details
  - `PATCH /update-password`: Update user password
  - `PATCH /photo`: Update user profile photo
  - `PATCH /mfa/setup`: Enable multi-factor authentication
  - `PATCH /mfa/cancle`: Disable multi-factor authentication

- **Paper Management**:
  - `GET /search`: Fetch papers with pagination and search
  - `POST /upload`: Upload new papers
  - `GET /:paperId`: Fetch specific paper details
  - `PATCH /update`: Update paper details
  - `GET /download/:paperName`: Download paper

### Toast Notifications

- **Info**: `toastInfo("Your message here")`
- **Success**: `toastSuccess("Your message here")`
- **Warning**: `toastWarning("Your message here")`
- **Error**: `toastError("Your message here")`

## Contributing

We welcome contributions to this project! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

Please ensure that your code adheres to the project's coding style and includes appropriate tests.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For questions or issues, please reach out to vergovmiroslav@gmail.com or open an issue in the GitHub repository.

---

Feel free to adapt the details based on your project specifics and any additional sections you think are necessary. This template provides a thorough overview of the project setup, usage, and contribution guidelines.
