# Web Server With UI - Client side #

This folder contains the client side of a template of a web server. It uses React, written in TypeScript, with Material-UI design.

*Important*: This boilerplate's UI is in English. If Hebrew support is needed, please check [Material-UI's documentation](https://material-ui.com/guides/right-to-left/) for adding RTL (right to left) support.

## Frameworks and Libraries ##

* **Framework**: [`react`](https://reactjs.org/) (bootstrapped with [`create-react-app`](https://github.com/facebook/create-react-app#readme))
* **Compiler**: [`typescript`](https://www.typescriptlang.org/)
* **Design**: [`material-ui`](https://material-ui.com/)
* **HTTP Client**: [`axios`](https://github.com/axios/axios)
* **Formatter**: [`prettier`](https://prettier.io/)
* **Linter**: [`eslint`](https://eslint.org/) (bundled inside `create-react-app`) + [`@typescript-eslint`](https://github.com/typescript-eslint/typescript-eslint#readme)
* **Transpiler**: [`babel`](https://babeljs.io/) (bundled inside `create-react-app`)
* **Bundler**: [`webpack`](https://webpack.js.org/) (bundled inside `create-react-app`)
* **Tests**: [`jest`](https://jestjs.io/) (bundled inside `create-react-app`) + [`React Testing Library`](https://testing-library.com/docs/react-testing-library/intro/)

## How do I get set up? ##

### Get the server side up ###

Alongside this `client` project folder there should be a `server` project folder. First, you have to set it up and get it running.

After that, you should make sure it runs on the same port as written in the `"/api*"` proxy route in the `src/setupProxy.js` file.

For your convenience, there is a script to run the server in dev mode from the client project.

```sh
npm run start:server
```

Pay attention: this script assumes you already have installed the server's dependencies with `npm install`.

### Install NodeJS and NPM ###

You can download it from the NodeJS site's [download page](https://nodejs.org/en/download/).

The installer of NPM is bundled in the NodeJS installer.

For optimal results, make sure you install the following versions:

* **NodeJS**: v14.21.3
* **NPM**: v6.14.18 (also briefly verified on v7.8.0)

### Clone this repository ###

Go to the [Templates home page](https://bitbucket.org/originai/templates/src/develop/) in bitbucket, click on the Clone button in the top right corner, and copy the `git clone` command to clone this repository wherever you want.

After the cloning is done, enter the app's root folder. You could use:

```sh
cd web-server-with-ui/client
```

### Install dependencies ###

Run the following command (and all `npm`'s commands) in the app's root folder:

```sh
npm install
```

It creates the `node_modules` folder in the app's root. This folder should be in `.gitignore`, and should not be committed.

### Start application in development mode ###

The following script runs the app in the development mode.

```sh
npm start
```

It automatically opens [http://localhost:3000](http://localhost:3000) in your browser.

The page will reload if you make edits.

You will also see any lint errors in the console.

### Run unit tests ###

The following script launches the test runner in the interactive watch mode.

```sh
npm test
```

For more information, please check [create-react-app's documentation](https://facebook.github.io/create-react-app/docs/running-tests).

This script also creates the `coverage` folder in the app's root. This folder should be in `.gitignore`, and should not be committed.

When running unit tests in CI environments, run instead `npm run test:ci` (which disables watch mode).

### Run all tests (formatter, linters & unit tests) ###

The following script runs Prettier (in auto fix mode), TypeScript compiler, ESLint and unit tests (in disabled watch mode).

```sh
npm run test:all
```

### Start application in production mode ###

In production, the application run on a docker container. You should have docker installed to run these commands.

```sh
docker build . -t client \
  --build-arg ARTI_DOCKER_REPO=<Optional. Default is "jf.originai.co/docker"> \
  --build-arg ARTI_USERNAME=<Your Artifactory username> \
  --build-arg ARTI_PASSWORD=<Your Artifactory password or API key> \
  --build-arg ARTI_PROTOCOL=<Optional. Default is "https"> \
  --build-arg ARTI_NPM_REPO=<Optional. Default is "jf.originai.co/artifactory/api/npm/npm">
```

```sh
docker run -p 80:80 client
```

After that, the client will be available on port 80 of the local machine.

The docker build process uses the `build` script from `package.json`, which correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes.

For more information, please check [create-react-app's documentation](https://facebook.github.io/create-react-app/docs/deployment).

### Advanced ###

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

To eject, run `npm run eject`.

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

## Project's structure explained ##

By alphabetical order, for convenience.

### `public` ###

Contains all the static resources needed by the app. When building the app for production, these files get copied to the `build` folder.

### `src` ###

Contains all the source code files, written in TypeScript files (`*.ts` + `*.tsx`), to be compiled by TypeScript's compiler.

#### `__mocks__` ####

* Contains all the default manual mocks of the modules imported from the `node_modules` folder. These are used automatically by Jest.
* For more information, please check [Jest's documentation](https://jestjs.io/docs/manual-mocks#mocking-node-modules).

#### `components` ####

* Contains all the UI's reusable components.
* Each different component has its own folder.
* Each component file is named `component.tsx`.
* The `component.tsx` file should always contain as few non-UI related logic as possible. Any non-UI related logic and logic that is used in more than one component, should be placed in the `src/services` folder.
* If custom styles are used (with Material-UI's `useStyles`), these styles should be placed in a `styles.ts` file alongside the `component.tsx` file.
* All the component's tests should be placed in a folder named exactly `__tests__`, and named `component.test.tsx`, for jest to find it.

#### `config` ####

* Contains all the configurations for the app, like URLs, magic numbers, etc.

#### `contexts` ####

* Contains all the React contexts of the app (which are created by using `React.createContext`).
* The rules for this folder are the same as for the `components` folder.

#### `hooks` ####

* Contains all the React's custom hooks.
* Note that each hook is a *function* and not a *class*.

#### `layouts` ####

* Contains all the app's layouts, including reusable headers, footers, menus, etc.
* The rules for this folder are the same as for the `components` folder.
* When using this project as a boilerplate, you can modify the `app-title` component, and you can add more layouts as you wish.

#### `models` ####

* Contains the shape definitions (=interfaces) of the objects used in the app.

#### `routes` ####

* Contains all the routes that are redirected by the `AppRouter` component that can be found in the `layouts` folder.
* The rules for this folder are the same as for the `components` folder.
* When using this project as a boilerplate, you can modify the `app-content` component, and replace the `example` component with yours, and you can add more components as you wish.

#### `services` ####

* Contains any logic that is used in more than one component or any non-UI related logic.
* When using this project as a boilerplate, you should replace the `example` service with yours, and you can add more services as you wish.

#### Files in `src`'s root ####

* `index.tsx`: The entry point of the app.
* `react-app-env.d.ts`: Types configuration file automatically created by `create-react-app`. It should not be modified manually.
* `setupProxy.js`: Manual proxy configuration file. Needed for development only. For more information, please check [create-react-app's documentation](https://create-react-app.dev/docs/proxying-api-requests-in-development/#configuring-the-proxy-manually).
* `setupTests.ts`: Jest's tests configuration, automatically run when tests are run.

### `.dockerignore` + `Dockerfile` + `nginx.conf` ###

Files used for deploying the app in production. For more details, please check the `Start application in production mode` section of this page.

### `.eslintrc` + `.eslintignore` ###

Configuration files of ESLint. For more information, please check [ESLint's documentation](https://eslint.org/docs/user-guide/configuring/).

For more information about the rules used in the `.eslintrc` file, please check:

* [ESLint rules](https://eslint.org/docs/rules/)
* [TypeScript ESLint rules](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#supported-rules)
* [Jest ESLint rules](https://github.com/jest-community/eslint-plugin-jest#rules)
* [React ESLint rules](https://github.com/yannickcr/eslint-plugin-react#list-of-supported-rules)

### `.prettierrc.json` + `.prettierignore` ###

Configuration files of Prettier. For more information, please check [Prettier's documentation](https://prettier.io/docs/en/options.html).

For more information about the plugins and the integration with ESLint, please check:

* [Prettier plugin sort imports](https://github.com/trivago/prettier-plugin-sort-imports)
* [Integrating with Linters](https://prettier.io/docs/en/integrating-with-linters.html)
* [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)

### `package.json` + `package-lock.json` ###

Configuration files of NPM.

`package.json` contains mainly the scripts to run the app and the dependencies of the project.

`package-lock.json` is auto-generated and should be committed. It should not be modified manually.

### `README.md` ###

This file :)

### `tsconfig.json` ###

Configuration file of TypeScript. For more information, please check [TypeScript's documentation](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).
