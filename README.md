# React Clean Architecture Boilerplate

# Table of Contents

- [React Clean Architecture Boilerplate](#react-clean-architecture-boilerplate)
- [Overview](#overview)
  - [Technologies](#technologies)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Development](#development)
  - [Production](#production)
    - [Simple Build](#simple-build)
    - [Build with Docker](#build-with-docker)
- [Naming Convetions](#naming-convetions)

## Overview

`React Clean Architecture Boilerplate` is a project for implementing clean architecture in
react app as a green field for big projects
### Technologies

- language: [Typescript](https://www.typescriptlang.org/)
- framework: [React](https://reactjs.org/)
- state management: [Zustand](https://github.com/pmndrs/zustand) 
- testing tools: [Vitest](https://vitest.dev/)
- lintins: [ESlint](https://eslint.org/)
- module bundler: [Vite](https://vitejs.dev/)
- HTTP client: [Axios](https://axios-http.com/)
- component library: [MUI](https://mui.com/)
- css in js: [Styled Components](https://www.styled-components.com/)
- i18n: [I18Next](https://www.i18next.com/)
- dependency injection: [tsyringe](https://github.com/microsoft/tsyringe)
- functional programming: [fp-ts](https://gcanti.github.io/fp-ts/)
- reactive programming: [rxjs](https://rxjs.dev/)

## Architecture

```bash
src

├── app/
│   ├── core/
│   │   └── users/
│   │       ├── store
│   │       ├── model
│   │       ├── view/
│   │       │   ├── stories
│   │       │   ├── style
│   │       │   ├── component.tsx
│   │       │   └── i-vm
│   │       ├── model
│   │       └── page
│   ├── support
│   └── generic
├── feature/
│   ├── core/
│   │   └── users/
│   │       ├── data/
│   │       │   ├── datasource
│   │       │   ├── repository
│   │       │   └── dto
│   │       └── domain/
│   │           ├── failure
│   │           ├── i-repository
│   │           ├── entity
│   │           └── usecase
│   ├── support
│   └── generic
├── bootstrap/
│   ├── boundary
│   ├── config
│   ├── di
│   ├── endpoint
│   ├── global-types
│   ├── helper
│   └── i18n
└── test/
    ├── common
    ├── unit
    ├── e2e
    └── integration
```

This boilerplate uses clean architecture for developing that consists three layers:

- Features <br/>
  this layer represents business logics. all the core functionality of the app resides in this layer that consists data, entity and usecase sections

- Applicaiton <br/>
  this layer is responsible for main application behavior and controlls what to show in UI that consists model, viewmodel and view sections

- Bootstrap <br/>
  this layer is responsible for connecting layers to eachother, provides external libraries for them and wrap third-party libraries and base configuration of the framework and the app.

  > note: for more information about the architecture you can take a look at the [full-documentation](./full-documentation/Readme.md) of the project

## Getting Started

### Development

1.

```bash
 yarn dev / npm run dev
```

### Production

#### Simple Build

```bash
yarn build
```

for running the built project, localy you can use following commands after building.

```bash
npm i -g serve
serve dist
```

#### Build with Docker

1. at first you should define your environment variables.

Note: You can get needed variables from [docker-compose](./docker-compose.yml) file

for running with docker-compose, you can set these environment variable in [docker-compose](./docker-compose.yml) file in the args.

2.

```bash
  docker-compose -f docker-compose.yml up [-d] [--build] [--foce-recreate]
```
## naming convetions:

1. all **_folders_** follow the kebab-case convention for naming.
2. all **_files_** follow the kebab-case convention for naming.
3. all **_variables_** and **_functions_** follow the camelCase convention for naming.
