# Tools Used

- React 18 with hooks
- TypeScript
- Vite 2 for fast builds and dev server
- Chakra UI for styling
- React Router v6 for routing
- React Query for data fetching
- Framer Motion for animations
- React Helmet Async for managing page title and meta tags
- React Hook Form for form management
- Yup/Zod for form validation
- lint-staged and husky for automatic linting and formatting on commit
- CommitLint and Conventional Changelog CLI for generating changelogs
- zustand for state management
- @tanstack/react-table for creating datatable
- husky precommit hooks to restrict type any, console and unused variables

# DUMPS Frontend Project

This is the frontend application for our Dumps Selling Site. The application is built using React and TypeScript.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Branching Strategy](#branching-strategy)
- [Development Workflow](#development-workflow)
- [Running the Project](#running-the-project)
- [Testing](#testing)
- [Code Quality](#code-quality)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

To get started with the project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-repo/frontend.git
   cd frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm start
   ```

This will start the development server on `http://localhost:3000`.

## Project Structure

The project structure is organized as follows:

```
frontend/
│
├── public/             # Public assets
├── src/                # Source code
│   ├── components/     # React components
│   ├── pages/          # Page components
│   ├── store/          # Redux or Context store
│   ├── utils/          # Utility functions
│   ├── hooks/          # Custom hooks
│   ├── styles/         # Global and component-specific styles
│   └── index.tsx       # Entry point
│
├── .env                # Environment variables
├── package.json        # Project configuration and dependencies
└── README.md           # Project documentation
```

## Branching Strategy

We follow a structured branching strategy to ensure smooth development and deployment processes:

- **Main Branch (`main`)**:
  - This is the master branch and should always contain the production-ready code.
- **Release Branch (`release`)**:
  - This branch is used for the preparation of production releases. It contains stable code ready for production deployment.
- **Sprint Branches (`sprint-x`)**:
  - A sprint branch is created from the `release` branch for each sprint. All feature branches are created from the respective sprint branch.
- **Feature Branches**:
  - Feature branches are created from the current sprint branch. The name of the branch should correspond to the JIRA task ID (e.g., `ID-10`).

### Branching Workflow

1. **Pull the `release` branch:**

   ```bash
   git checkout release
   git pull origin release
   ```

2. **Create a new sprint branch from `release`:**

   ```bash
   git checkout -b sprint-x
   ```

3. **Create a feature branch from the sprint branch:**

   ```bash
   git checkout -b ID-10
   ```

   (Replace `ID-10` with your actual JIRA task ID.)

4. **Work on your feature, commit changes, and push the branch:**

   ```bash
   git add .
   git commit -m "ID-10: Implemented feature XYZ"
   git push origin ID-10
   ```

5. **Before pushing your final changes, pull the latest changes from the sprint branch:**

   ```bash
   git checkout sprint-x
   git pull origin sprint-x
   git checkout ID-10
   git merge sprint-x
   ```

6. **Push your feature branch and create a merge request into the sprint branch:**

   ```bash
   git push origin ID-10
   ```

7. **Sprint Closure:**

   - After all features are merged into the sprint branch, create a pull request from the sprint branch to the `release` branch and merge it.
   - Deploy the code from the `release` branch to production.

8. **Post-Release:**
   - Once the code is verified in production, create a pull request from the `release` branch to the `main` branch and merge it.

## Development Workflow

1. **Feature Development**:
   - Start a new branch for each feature or bugfix using the JIRA task ID as the branch name.
2. **Commit Messages**:

   - Follow the format: `ID-XX: Your commit message`, where `ID-XX` is the JIRA task ID.

3. **Pull Requests**:

   - Open a pull request against the sprint branch when your feature is complete.
   - Make sure all tests pass before requesting a review.

4. **Code Reviews**:

   - All pull requests require at least one approval before merging.

5. **Merge Requests**:
   - Merge your feature branch into the sprint branch once it has been reviewed and approved.
   - Merge the sprint branch into `release` after the sprint is completed.

## Running the Project

To start the project in development mode:

```bash
npm start
```

To build the project for production:

```bash
npm run build
```

## Testing

To run the tests:

```bash
npm test
```

Ensure that all tests pass before submitting a pull request.

## Code Quality

- **Linting**:
  - We use ESLint to enforce code quality standards. Run the linter using:
    ```bash
    npm run lint
    ```
- **Prettier**:
  - Code formatting is enforced using Prettier. Format your code with:
    ```bash
    npm run format
    ```

## Contributing

Please follow the [contributing guidelines](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

This README file outlines the key aspects of the frontend project, including the branching strategy, workflow, and instructions for running and contributing to the project. It serves as a guide for developers to maintain consistency and quality throughout the development process.
