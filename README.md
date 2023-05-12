# Task Manager  
This implementation is based on writing the expected Task Manager implementation using existing framework starters.  
  
My goals in creating this project were to show clean, understandable architecture that could be easily modified.  
  
An additional goal was to work with Prisma as an ORM while using a lightweight database solution appropriate to a sample project. A benefit of Prisma is that it makes it easy to switch out database implementations to something more robust when necessary. Implementation of Prisma based on [https://docs.nestjs.com/recipes/prisma](https://docs.nestjs.com/recipes/prisma).  

## Installation and Running the App
The easiest way to run this app currently is to use the Nest dev server and the Vite client dev server in separate terminal windows. You can open the client at `localhost:5173` and it will retrieve data from the backend.  
Do the following in the base folder:  
```bash
$ npm install
$ npx prisma generate // generate Prisma client from schema, initiate Sqlite db
$ npm run start:dev
```
Open a second terminal window and from the base folder, navigate to the client subfolder:  
```bash
$ cd client/
$ npm install
$ npm run dev
```
## What's here and what's not
Some of the things I considered most important in this implementation were:
1. Working code! Having a working project was my #1 goal! XD
2. The biggest question I had in implementing this project was that the description is "Task manager for authenticated users", but there's no mention of a User or Authentication in the requirements or implementation details. Even the mocks don't have the concept of a user. In order to be production ready, this slice of functionality (a Task Module) needs to be paired with the necessary User modules.
3. Clear design. My greatest regret in setting up this project is the amount of boilerplate that's necessary to have a working project in a short period of time. I feel like this is an easy way to incur technical debt, since this boilerplate is the least understood (I wrote the rest, so I know where the weak points are) and hardest to test.  
4. Testing core interactions. I would have like to work on broader tests, including unit testing the individual views and their methods, but in the interest of time, I left this in my 'to do' list and focused on a working app. In order to be production ready, I would like to have thorough tests of behavior and interaction in the app and a better way of testing the individual layers of the project.
5. Security. The Nest app allows CORS using its default configuration. This definitely needs further investigation.

## Nice to have - ideas for future improvement 
* Client store that maintains current state and handles front-end service calls directly.
* Pagination of the task manager. The variables needed for pagination are present on the backend but not implemented in the client.
* Warning message on 'Delete task'. That seems like a better user experience.  

## Frontend (Vue 3) Description
Based on the starter template for Vue 3. [https://vuejs.org/guide/quick-start.html#creating-a-vue-application](https://vuejs.org/guide/quick-start.html#creating-a-vue-application).  

UI was designed using Vuetify, which I like as an easy-to-implement component library. 

All terminal instructions for the frontend need to be run from the `./client` folder.
## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run dev
```

## Test

```bash
# unit tests
$ npm run test:unit
``` 

## Backend (NestJS) Description

Based on [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
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

