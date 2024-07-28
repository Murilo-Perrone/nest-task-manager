

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

## Description

This is a simple task management API built with <a href="http://nodejs.org" target="_blank">Node.js</a>, <a href="http://nestjs.com" target="_blank">Nest.js</a>, and SQLite3. It was developed from Nest TypeScript starter template.

## Features

- CRUD operations for tasks
- SQLite3 in-memory database
- Swagger API documentation
- Jest for endpoint testing
- Docker containerization
- Fastify with [handlebars](https://github.com/pillarjs/hbs#readme) (`hbs`) for a simple front-end example

## Setup Instructions

### Prerequisites

- Node.js (version 18 or later)
- Docker

### Local Development

1. Clone the repository:

```bash
git clone https://github.com/Murilo-Perrone/nest-task-manager.git
cd nest-task-manager
```

2. Install dependencies:

```bash
npm install
```

3. Run the application:

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

4. Access the application using:
  * `http://localhost:3000` for root page
  * `http://localhost:3000/tasks` for querying all tasks
  * `http://localhost:3000/index` for the fastify view with all tasks
  * `http://localhost:3000/api` for the Swagger API documentation

### Dockerfile

To build and run your docker image use:

```bash
# Build the Docker image
docker build -t nest-task-manager .

# Run the Docker container
docker run -p 3000:3000 nest-task-manager
```

Known bug: The dockeimage is failing with this error:
```
[Nest] 1  - 07/28/2024, 8:26:26 PM   ERROR [TypeOrmModule] Unable to connect to the database. Retrying (1)...
DriverPackageNotInstalledError: SQLite package has not been found installed.
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author: Murilo Perrone
- Contacts: [Linkedin](https://www.linkedin.com/in/murilo-perrone-088392b9/), [Wordpress](https://muriloperrone.wordpress.com/)

## License

Like Nest, this is a [MIT licensed](LICENSE) open source project.
