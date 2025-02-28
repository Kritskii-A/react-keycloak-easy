import { FC } from "react";
import { createAuthProvider } from "../core";
import { reactKeycloakWebContext } from "./context";
import type { AuthProviderProps } from "../core/provider";
import type Keycloak from "keycloak-js";

export const ReactKeycloakProvider: FC<AuthProviderProps<Keycloak>> =
  createAuthProvider(reactKeycloakWebContext) as unknown as FC<
    AuthProviderProps<Keycloak>
  >;
