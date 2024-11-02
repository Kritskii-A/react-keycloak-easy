# React Keycloak Easy <!-- omit in toc -->

> React bindings for [Keycloak](https://www.keycloak.org/)

---

## Table of Contents <!-- omit in toc -->

- [Install](#install)
- [Getting Started](#getting-started)
  - [Setup Keycloak instance](#setup-keycloak-instance)
  - [Setup KeycloakProvider](#setup-keycloakprovider)
  - [Hook Usage](#hook-usage)
- [License](#license)

---

## Install

React Keycloak requires:

- React **16.8** or later
- `keycloak-js` **9.0.2** or later

```shell
yarn add react-keycloak-easy
```

or

```shell
npm install --save react-keycloak-easy
```

## Getting Started

### Setup Keycloak instance

Create a `keycloak.js` file in the `src` folder of your project (where `App.js` is located) with the following content

```js
import Keycloak from "keycloak-js";

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak = new Keycloak();

export default keycloak;
```

### Setup KeycloakProvider

Wrap your App inside `ReactKeycloakProvider` and pass the `keycloak` instance as prop

```js
import { ReactKeycloakProvider } from "react-keycloak-easy";

import keycloak from "./keycloak";

// Wrap everything inside KeycloakProvider
const App = () => {
  return (
    <ReactKeycloakProvider authClient={keycloak}>...</ReactKeycloakProvider>
  );
};
```

**N.B.** If your using other providers (such as `react-redux`) it is recommended to place them inside `ReactKeycloakProvider`.

`ReactKeycloakProvider` automatically invokes `keycloak.init()` method when needed and supports the following props:

- `initOptions`, contains the object to be passed to `keycloak.init()` method, by default the following is used

      {
        onLoad: 'check-sso',
      }

  for more options see [Keycloak docs](https://www.keycloak.org/docs/latest/securing_apps/index.html#init-options).

- `tokenExchangeParams`, are parameters used for the token exchange process in Keycloak. Token exchange allows a client to exchange one type of token for another. This is useful for scenarios like accessing resources of another client or performing actions on behalf of another user.
  In this case, you should also track onTokens with type = 'exchange' to handle token updates:

```
keycloak.onTokens = (tokens) => {
  if (tokens.type === 'exchange') {
    console.log('Token exchange event:', tokens);
  }
};
```

Additionally, you can access values from tokenExchange and tokenExchangeParsed in Keycloak

- `LoadingComponent`, a component to be displayed while `keycloak` is being initialized, if not provided child components will be rendered immediately. Defaults to `null`

- `isLoadingCheck`, an optional loading check function to customize LoadingComponent display condition. Return `true` to display LoadingComponent, `false` to hide it.

  Can be implemented as follow

  ```js
  (keycloak) => !keycloak.authenticated;
  ```

- `onEvent`, an handler function that receives events launched by `keycloak`, defaults to `null`.

  It can be implemented as follow

  ```js
  (event, error) => {
    console.log("onKeycloakEvent", event, error);
  };
  ```

  Published events are:

  - `onReady`
  - `onInitError`
  - `onAuthSuccess`
  - `onAuthError`
  - `onAuthRefreshSuccess`
  - `onAuthRefreshError`
  - `onTokenExpired`
  - `onAuthLogout`

- `onTokens`, an handler function that receives `keycloak` tokens as an object every time they change, defaults to `null`.

  Keycloak tokens are returned as follow

  ```json
  {
    "idToken": string,
    "refreshToken": string,
    "token": string,
    "type": "classic" | "exchange"
  }
  ```

### Hook Usage

When a component requires access to `Keycloak`, you can use the `useKeycloak` Hook.

```js
import { useKeycloak } from "react-keycloak-easy";

export default () => {
  // Using Object destructuring
  const { keycloak, initialized } = useKeycloak();

  // Here you can access all of keycloak methods and variables.
  // See https://www.keycloak.org/docs/latest/securing_apps/index.html#javascript-adapter-reference

  return (
    <div>
      <div>{`User is ${
        !keycloak.authenticated ? "NOT " : ""
      }authenticated`}</div>

      {!!keycloak.authenticated && (
        <button type="button" onClick={() => keycloak.logout()}>
          Logout
        </button>
      )}
    </div>
  );
};
```

## License

MIT
