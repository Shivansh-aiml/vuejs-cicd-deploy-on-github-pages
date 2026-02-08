# Vue.js CI/CD Deployment on GitHub Pages 🚀

![GitHub Pages](https://img.shields.io/badge/Deploy%20to-GitHub%20Pages-blue?style=flat-square&logo=github)

Welcome to the **vuejs-cicd-deploy-on-github-pages** repository! This project demonstrates how to set up a Vue 3 + Vite project using Bun or Node.js. It includes automated deployment to GitHub Pages using the `gh-pages` package and GitHub Actions. 

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [GitHub Actions](#github-actions)
- [Contributing](#contributing)
- [License](#license)
- [Releases](#releases)

## Introduction

In modern web development, Continuous Integration (CI) and Continuous Deployment (CD) are essential practices. They help automate the process of building, testing, and deploying applications. This repository focuses on integrating these practices into a Vue.js application, allowing developers to streamline their workflow.

## Features

- Set up a Vue 3 project with Vite.
- Use Bun or Node.js as the runtime environment.
- Automate deployment to GitHub Pages.
- Utilize GitHub Actions for CI/CD.
- Simple and clean project structure.

## Getting Started

To get started with this project, follow the instructions below.

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (or [Bun](https://bun.sh/))
- [Git](https://git-scm.com/)
- A GitHub account

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Shivansh-aiml/vuejs-cicd-deploy-on-github-pages.git
   ```

2. Navigate into the project directory:

   ```bash
   cd vuejs-cicd-deploy-on-github-pages
   ```

3. Install the dependencies:

   If you are using Node.js:

   ```bash
   npm install
   ```

   If you are using Bun:

   ```bash
   bun install
   ```

## Project Structure

The project structure is designed to be simple and intuitive. Here’s a breakdown:

```
vuejs-cicd-deploy-on-github-pages/
├── public/                # Static assets
├── src/                   # Source files
│   ├── components/        # Vue components
│   ├── App.vue            # Main application file
│   └── main.js            # Entry point
├── .github/               # GitHub Actions workflows
│   └── workflows/
│       └── deploy.yml     # Deployment workflow
├── index.html             # HTML file
├── package.json           # Project metadata and dependencies
└── vite.config.js         # Vite configuration
```

## Configuration

To configure the project for deployment, update the `vite.config.js` file. Set the `base` property to your GitHub Pages URL:

```javascript
export default defineConfig({
  base: '/vuejs-cicd-deploy-on-github-pages/',
  // other configurations...
});
```

## Deployment

The deployment process is automated through GitHub Actions. Once you push changes to the `main` branch, the workflow defined in `.github/workflows/deploy.yml` will trigger and deploy your application to GitHub Pages.

To manually trigger a deployment, you can run:

```bash
npm run deploy
```

or 

```bash
bun run deploy
```

## GitHub Actions

The CI/CD pipeline is managed using GitHub Actions. The deployment workflow (`deploy.yml`) is set up to build the application and deploy it to GitHub Pages. Here’s a brief overview of the workflow:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Deploy
        run: npx gh-pages -d dist
```

This workflow will:

1. Check out the code.
2. Set up the Node.js environment.
3. Install dependencies.
4. Build the project.
5. Deploy the built files to GitHub Pages.

## Contributing

We welcome contributions to this project. If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes.
4. Submit a pull request.

Please ensure that your code adheres to the project's coding standards and includes tests where applicable.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Releases

For the latest updates and releases, please visit the [Releases](https://github.com/Shivansh-aiml/vuejs-cicd-deploy-on-github-pages/releases) section of this repository.

Feel free to download the latest version and execute it in your environment. 

---

Thank you for checking out this repository! We hope you find it useful for your projects. If you have any questions or feedback, please feel free to reach out.