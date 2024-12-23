import * as React from "react";
import isEqual from "react-fast-compare";

import { IAuthContextProps } from "./context";
import {
  AuthClient,
  AuthClientError,
  AuthClientEvent,
  AuthClientInitOptions,
  AuthClientTokens,
} from "./types";
import { decodeToken } from "./utils";

/**
 * Props that can be passed to AuthProvider
 */
export type AuthProviderProps<T extends AuthClient> = {
  children: React.ReactNode;
  /**
   * The single AuthClient instance to be used by your application.
   */
  authClient: T;

  /**
   * A flag to enable automatic token refresh. Defaults to true.
   * This is useful if you need to disable it (not recommended).
   *
   * @default true
   */
  autoRefreshToken?: boolean;

  /**
   * The config to be used when initializing AuthClient instance.
   */
  initOptions?: AuthClientInitOptions;

  /**
   * An optional loading check function to customize LoadingComponent display condition.
   * Return `true` to display LoadingComponent, `false` to hide it.
   *
   * @param authClient the current AuthClient instance.
   *
   * @returns {boolean} Set to true to display LoadingComponent, false to hide it.
   */
  isLoadingCheck?: (authClient: T) => boolean;

  /**
   * An optional component to display while AuthClient instance is being initialized.
   */
  LoadingComponent?: JSX.Element;

  /**
   * An optional function to receive AuthClient events as they happen.
   */
  onEvent?: (eventType: AuthClientEvent, error?: AuthClientError) => void;

  /**
   * An optional function to receive AuthClient tokens when changed.
   *
   * @param {AuthClientTokens} tokens The current AuthClient tokens set.
   */
  onTokens?: (tokens: AuthClientTokens) => void;

  tokenExchangeParams?: {
    [key: string]: string;
  };
};

type AuthProviderState = {
  initialized: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  token?: string;
  exchangedToken?: string;
};

/**
 * Create an AuthProvider component to wrap a React app with, it will take care of common AuthClient
 * lifecycle handling (such as initialization and token refresh).
 *
 * @param AuthContext the Auth context to be used by the created AuthProvider
 *
 * @returns the AuthProvider component
 */
export function createAuthProvider<T extends AuthClient>(
  AuthContext: React.Context<IAuthContextProps<T>>
) {
  const defaultInitOptions: AuthClientInitOptions = {
    onLoad: "check-sso",
  };

  const initialState: AuthProviderState = {
    initialized: false,
    isAuthenticated: false,
    isLoading: true,
    token: undefined,
    exchangedToken: undefined,
  };

  return class KeycloakProvider extends React.PureComponent<
    AuthProviderProps<T>,
    AuthProviderState
  > {
    state = {
      ...initialState,
    };

    componentDidMount() {
      this.init();
    }

    componentDidUpdate({
      authClient: prevAuthClient,
      initOptions: prevInitOptions,
    }: AuthProviderProps<T>) {
      const { initOptions, authClient } = this.props;
      if (
        authClient !== prevAuthClient ||
        !isEqual(initOptions, prevInitOptions)
      ) {
        prevAuthClient.onReady = undefined;
        prevAuthClient.onAuthSuccess = undefined;
        prevAuthClient.onAuthError = undefined;
        prevAuthClient.onAuthRefreshSuccess = undefined;
        prevAuthClient.onAuthRefreshError = undefined;
        prevAuthClient.onAuthLogout = undefined;
        prevAuthClient.onTokenExpired = undefined;

        this.setState({ ...initialState });
        this.init();
      }
    }

    init() {
      const { initOptions, authClient } = this.props;

      authClient.onReady = this.updateState("onReady");
      authClient.onAuthSuccess = this.updateState("onAuthSuccess");
      authClient.onAuthError = this.onError("onAuthError");
      authClient.onAuthRefreshSuccess = this.updateState(
        "onAuthRefreshSuccess"
      );
      authClient.onAuthRefreshError = this.onError("onAuthRefreshError");
      authClient.onAuthLogout = this.updateState("onAuthLogout");
      authClient.onTokenExpired = this.refreshToken("onTokenExpired");

      authClient
        .init({ ...defaultInitOptions, ...initOptions })
        .catch(this.onError("onInitError"));
    }

    async tokenExchange(
      token: string,
      tokenExchangeParams: {
        [key: string]: string;
      }
    ): Promise<string> {
      const { authClient } = this.props;
      //@ts-ignore
      const url = `${authClient.authServerUrl}/realms/${authClient.realm}/protocol/openid-connect/token`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "urn:ietf:params:oauth:grant-type:token-exchange",
          subject_token: token,
          ...tokenExchangeParams,
        }),
      });

      if (!response.ok) {
        throw new Error("Token exchange failed");
      }

      const data = await response.json();
      return data.access_token;
    }

    onError = (event: AuthClientEvent) => (error?: AuthClientError) => {
      const { onEvent } = this.props;
      onEvent && onEvent(event, error);
    };

    updateState = (event: AuthClientEvent) => async () => {
      const {
        authClient,
        onEvent,
        onTokens,
        isLoadingCheck,
        tokenExchangeParams,
      } = this.props;

      const {
        initialized: prevInitialized,
        isAuthenticated: prevAuthenticated,
        isLoading: prevLoading,
      } = this.state;

      onEvent && onEvent(event);

      const isLoading = isLoadingCheck ? isLoadingCheck(authClient) : false;

      const isAuthenticated = isUserAuthenticated(authClient);

      const { idToken, refreshToken, token } = authClient;
      onTokens &&
        onTokens({
          type: "classic",
          idToken,
          refreshToken,
          token,
        });

      if (
        (event === "onAuthSuccess" || event === "onAuthRefreshSuccess") &&
        tokenExchangeParams &&
        token
      ) {
        try {
          const newToken = await this.tokenExchange(token, tokenExchangeParams);

          this.setState({
            exchangedToken: newToken,
          });

          if (onTokens) {
            onTokens({
              idToken,
              refreshToken,
              token: newToken,
              type: "exchange",
            });

            //@ts-ignore
            authClient.tokenExchange = newToken;
            //@ts-ignore
            authClient.tokenExchangeParsed = decodeToken(newToken);
          }
        } catch (error) {
          console.error("Token exchange failed:", error);
        }
      }

      if (
        !prevInitialized ||
        isAuthenticated !== prevAuthenticated ||
        isLoading !== prevLoading
      ) {
        this.setState({
          initialized: true,
          isAuthenticated,
          isLoading,
        });
      }
    };

    refreshToken = (event: AuthClientEvent) => () => {
      const { autoRefreshToken, authClient, onEvent } = this.props;
      onEvent && onEvent(event);

      if (autoRefreshToken !== false) {
        authClient.updateToken(5);
      }
    };

    render() {
      const { children, authClient, LoadingComponent } = this.props;
      const { initialized, isLoading } = this.state;

      if (!!LoadingComponent && (!initialized || isLoading)) {
        return LoadingComponent;
      }

      return (
        <AuthContext.Provider value={{ ...this.state, authClient }}>
          {children}
        </AuthContext.Provider>
      );
    }
  };
}

function isUserAuthenticated(authClient: AuthClient) {
  return !!authClient.idToken && !!authClient.token;
}

export default createAuthProvider;
