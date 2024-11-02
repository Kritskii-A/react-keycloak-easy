import * as React from "react";
import { IAuthContextProps } from "./context";
import { AuthClient, AuthClientError, AuthClientEvent, AuthClientInitOptions, AuthClientTokens } from "./types";
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
export declare function createAuthProvider<T extends AuthClient>(AuthContext: React.Context<IAuthContextProps<T>>): {
    new (props: AuthProviderProps<T>): {
        state: {
            initialized: boolean;
            isAuthenticated: boolean;
            isLoading: boolean;
            token?: string;
            exchangedToken?: string;
        };
        componentDidMount(): void;
        componentDidUpdate({ authClient: prevAuthClient, initOptions: prevInitOptions, }: AuthProviderProps<T>): void;
        init(): void;
        tokenExchange(token: string, tokenExchangeParams: {
            [key: string]: string;
        }): Promise<string>;
        onError: (event: AuthClientEvent) => (error?: AuthClientError) => void;
        updateState: (event: AuthClientEvent) => () => Promise<void>;
        refreshToken: (event: AuthClientEvent) => () => void;
        render(): React.JSX.Element;
        context: unknown;
        setState<K extends keyof AuthProviderState>(state: AuthProviderState | ((prevState: Readonly<AuthProviderState>, props: Readonly<AuthProviderProps<T>>) => AuthProviderState | Pick<AuthProviderState, K> | null) | Pick<AuthProviderState, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<AuthProviderProps<T>>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<AuthProviderProps<T>>, nextState: Readonly<AuthProviderState>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<AuthProviderProps<T>>, prevState: Readonly<AuthProviderState>): any;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<AuthProviderProps<T>>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<AuthProviderProps<T>>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<AuthProviderProps<T>>, nextState: Readonly<AuthProviderState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<AuthProviderProps<T>>, nextState: Readonly<AuthProviderState>, nextContext: any): void;
    };
    new (props: AuthProviderProps<T>, context: any): {
        state: {
            initialized: boolean;
            isAuthenticated: boolean;
            isLoading: boolean;
            token?: string;
            exchangedToken?: string;
        };
        componentDidMount(): void;
        componentDidUpdate({ authClient: prevAuthClient, initOptions: prevInitOptions, }: AuthProviderProps<T>): void;
        init(): void;
        tokenExchange(token: string, tokenExchangeParams: {
            [key: string]: string;
        }): Promise<string>;
        onError: (event: AuthClientEvent) => (error?: AuthClientError) => void;
        updateState: (event: AuthClientEvent) => () => Promise<void>;
        refreshToken: (event: AuthClientEvent) => () => void;
        render(): React.JSX.Element;
        context: unknown;
        setState<K extends keyof AuthProviderState>(state: AuthProviderState | ((prevState: Readonly<AuthProviderState>, props: Readonly<AuthProviderProps<T>>) => AuthProviderState | Pick<AuthProviderState, K> | null) | Pick<AuthProviderState, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<AuthProviderProps<T>>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<AuthProviderProps<T>>, nextState: Readonly<AuthProviderState>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<AuthProviderProps<T>>, prevState: Readonly<AuthProviderState>): any;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<AuthProviderProps<T>>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<AuthProviderProps<T>>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<AuthProviderProps<T>>, nextState: Readonly<AuthProviderState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<AuthProviderProps<T>>, nextState: Readonly<AuthProviderState>, nextContext: any): void;
    };
    contextType?: React.Context<any> | undefined;
};
export default createAuthProvider;
