# EarthquakeStats

Welcome to the EarthquakeStats project. This repository contains two main applications: an Apollo GraphQL Server + Express + MongoDB application named `node-app`, and a Next + React + Apollo Client application named `react-app`. The project displays a table of earthquake data and supports CRUD operations for the Earthquake entity.

## Table of Contents

- [Project Description](#project-description)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Initialization](#database-initialization)
- [Development](#development)
  - [Starting the Node App](#starting-the-node-app)
  - [Starting the React App](#starting-the-react-app)
- [Testing](#testing)
- [Build](#build)
- [Nx Commands](#nx-commands)
- [License](#license)

## Project Description

This project is an example of NX monorepo containing two applications:
- **node-app:** An Apollo GraphQL Server + Express application backed by MongoDB.
- **react-app:** A frontend application using Next.js, React, and Apollo Client.

## Prerequisites

Ensure you have the following installed before you start:
- [Node.js](https://nodejs.org/) (version 18 recommended)
- [npm](https://www.npmjs.com/) (version 6 or above recommended)
- [MongoDB](https://www.mongodb.com/) (ensure MongoDB is installed and running)

## Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/MKrutii/earthquake-stats.git
cd earthquake-stats

npm install
```

Create `.env` or `.env.local` file in the root of the project, add your configuration for database and other required fields.

```dotenv
MONGODB_URI='mongodb://localhost:27017'
MONGODB_NAME=test_db
```


## Database Initialization

To populate the MongoDB database with initial data, run the provided initialization script:

```bash
npx nx migrate
```

The `migrate` command is configured as follows in `nx.json`:

```json
"migrate": {
  "executor": "nx:run-commands",
  "options": {
    "command": "cross-env NODE_ENV=development ts-node apps/node-app/src/scripts/initScript.ts"
  }
}
```

## Development

### Starting the Node App

To start the Apollo GraphQL Server + Express application `node-app`:

```bash
npx nx serve node-app
```

The `serve` command is configured as follows in `workspace.json`:

```json
"serve": {
  "executor": "@nx/js:node",
  "defaultConfiguration": "development",
  "dependsOn": ["build"],
  "options": {
    "buildTarget": "node-app:build",
    "runBuildTargetDependencies": false
  },
  "configurations": {
    "development": {
      "buildTarget": "node-app:build:development"
    },
    "production": {
      "buildTarget": "node-app:build:production"
    }
  }
},
```

### Starting the React App

To start the Next.js + React + Apollo Client application `react-app`:

```bash
npx nx dev react-app
```

## Testing

Run tests for all projects:

```bash
npx nx test
```

To run tests for a specific project:

```bash
npx nx test node-app
npx nx test react-app
```

## Build

To build a specific project:

```bash
npx nx build node-app
npx nx build react-app
```

The `build` command for `node-app` is configured as follows in `workspace.json`:

```json
"build": {
  "executor": "@nx/esbuild:esbuild",
  "outputs": ["{options.outputPath}"],
  "defaultConfiguration": "production",
  "options": {
    "platform": "node",
    "outputPath": "dist/apps/node-app",
    "format": ["cjs"],
    "bundle": false,
    "main": "apps/node-app/src/main.ts",
    "tsConfig": "apps/node-app/tsconfig.app.json",
    "assets": ["apps/node-app/src/assets"],
    "generatePackageJson": true,
    "esbuildOptions": {
      "sourcemap": true,
      "outExtension": {
        ".js": ".js"
      }
    }
  },
  "configurations": {
    "development": {},
    "production": {
      "esbuildOptions": {
        "sourcemap": false,
        "outExtension": {
          ".js": ".js"
        }
      }
    }
  }
},
```

## Nx Commands

This project uses [Nx](https://nx.dev/) to manage the monorepo. Below are some useful Nx commands:

- **Lint the codebase**: `npx nx lint`
- **Format the codebase**: `npx nx format:write`

To see all available targets to run for a project:

```sh
npx nx show project react-app
```

For a detailed guide on Nx commands, visit the [Nx Documentation](https://nx.dev/latest/angular/cli/overview).

## License

This project is licensed under the MIT License.
