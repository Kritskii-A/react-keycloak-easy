import { createAuthProvider } from "../core";

import { reactKeycloakWebContext } from "./context";

export const ReactKeycloakProvider = createAuthProvider(
  reactKeycloakWebContext
);
