import { createAuthContext } from "../core";
import type { KeycloakInstance } from "keycloak-js";

export const reactKeycloakWebContext = createAuthContext<KeycloakInstance>();

export const ReactKeycloakWebContextConsumer = reactKeycloakWebContext.Consumer;
