export declare const ReactKeycloakProvider: {
    new (props: import("..").AuthProviderProps<import("keycloak-js").default>): {
        state: {
            initialized: boolean;
            isAuthenticated: boolean;
            isLoading: boolean;
            token?: string;
            exchangedToken?: string;
        };
        componentDidMount(): void;
        componentDidUpdate({ authClient: prevAuthClient, initOptions: prevInitOptions, }: import("..").AuthProviderProps<import("keycloak-js").default>): void;
        init(): void;
        tokenExchange(token: string, tokenExchangeParams: {
            [key: string]: string;
        }): Promise<string>;
        onError: (event: import("..").AuthClientEvent) => (error?: import("..").AuthClientError) => void;
        updateState: (event: import("..").AuthClientEvent) => () => Promise<void>;
        refreshToken: (event: import("..").AuthClientEvent) => () => void;
        render(): import("react").JSX.Element;
        context: unknown;
        setState<K extends keyof {
            initialized: boolean;
            isAuthenticated: boolean;
            isLoading: boolean;
            token?: string;
            exchangedToken?: string;
        }>(state: {
            initialized: boolean;
            isAuthenticated: boolean;
            isLoading: boolean;
            token?: string;
            exchangedToken?: string;
        } | ((prevState: Readonly<{
            initialized: boolean;
            isAuthenticated: boolean;
            isLoading: boolean;
            token?: string;
            exchangedToken?: string;
        }>, props: Readonly<import("..").AuthProviderProps<import("keycloak-js").default>>) => {
            initialized: boolean;
            isAuthenticated: boolean;
            isLoading: boolean;
            token?: string;
            exchangedToken?: string;
        } | Pick<{
            initialized: boolean;
            isAuthenticated: boolean;
            isLoading: boolean;
            token?: string;
            exchangedToken?: string;
        }, K> | null) | Pick<{
            initialized: boolean;
            isAuthenticated: boolean;
            isLoading: boolean;
            token?: string;
            exchangedToken?: string;
        }, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<import("..").AuthProviderProps<import("keycloak-js").default>>;
        refs: {
            [key: string]: import("react").ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<import("..").AuthProviderProps<import("keycloak-js").default>>, nextState: Readonly<{
            initialized: boolean;
            isAuthenticated: boolean;
            isLoading: boolean;
            token?: string;
            exchangedToken?: string;
        }>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: import("react").ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<import("..").AuthProviderProps<import("keycloak-js").default>>, prevState: Readonly<{
            initialized: boolean;
            isAuthenticated: boolean;
            isLoading: boolean;
            token?: string;
            exchangedToken?: string;
        }>): any;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<import("..").AuthProviderProps<import("keycloak-js").default>>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<import("..").AuthProviderProps<import("keycloak-js").default>>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<import("..").AuthProviderProps<import("keycloak-js").default>>, nextState: Readonly<{
            initialized: boolean;
            isAuthenticated: boolean;
            isLoading: boolean;
            token?: string;
            exchangedToken?: string;
        }>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<import("..").AuthProviderProps<import("keycloak-js").default>>, nextState: Readonly<{
            initialized: boolean;
            isAuthenticated: boolean;
            isLoading: boolean;
            token?: string;
            exchangedToken?: string;
        }>, nextContext: any): void;
    };
    new (props: import("..").AuthProviderProps<import("keycloak-js").default>, context: any): {
        state: {
            initialized: boolean;
            isAuthenticated: boolean;
            isLoading: boolean;
            token?: string;
            exchangedToken?: string;
        };
        componentDidMount(): void;
        componentDidUpdate({ authClient: prevAuthClient, initOptions: prevInitOptions, }: import("..").AuthProviderProps<import("keycloak-js").default>): void;
        init(): void;
        tokenExchange(token: string, tokenExchangeParams: {
            [key: string]: string;
        }): Promise<string>;
        onError: (event: import("..").AuthClientEvent) => (error?: import("..").AuthClientError) => void;
        updateState: (event: import("..").AuthClientEvent) => () => Promise<void>;
        refreshToken: (event: import("..").AuthClientEvent) => () => void;
        render(): import("react").JSX.Element;
        context: unknown;
        setState<K extends keyof {
            initialized: boolean;
            isAuthenticated: boolean;
            isLoading: boolean;
            token?: string;
            exchangedToken?: string;
        }>(state: {
            initialized: boolean;
            isAuthenticated: boolean;
            isLoading: boolean;
            token?: string;
            exchangedToken?: string;
        } | ((prevState: Readonly<{
            initialized: boolean;
            isAuthenticated: boolean;
            isLoading: boolean;
            token?: string;
            exchangedToken?: string;
        }>, props: Readonly<import("..").AuthProviderProps<import("keycloak-js").default>>) => {
            initialized: boolean;
            isAuthenticated: boolean;
            isLoading: boolean;
            token?: string;
            exchangedToken?: string;
        } | Pick<{
            initialized: boolean;
            isAuthenticated: boolean;
            isLoading: boolean;
            token?: string;
            exchangedToken?: string;
        }, K> | null) | Pick<{
            initialized: boolean;
            isAuthenticated: boolean;
            isLoading: boolean;
            token?: string;
            exchangedToken?: string;
        }, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<import("..").AuthProviderProps<import("keycloak-js").default>>;
        refs: {
            [key: string]: import("react").ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<import("..").AuthProviderProps<import("keycloak-js").default>>, nextState: Readonly<{
            initialized: boolean;
            isAuthenticated: boolean;
            isLoading: boolean;
            token?: string;
            exchangedToken?: string;
        }>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: import("react").ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<import("..").AuthProviderProps<import("keycloak-js").default>>, prevState: Readonly<{
            initialized: boolean;
            isAuthenticated: boolean;
            isLoading: boolean;
            token?: string;
            exchangedToken?: string;
        }>): any;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<import("..").AuthProviderProps<import("keycloak-js").default>>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<import("..").AuthProviderProps<import("keycloak-js").default>>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<import("..").AuthProviderProps<import("keycloak-js").default>>, nextState: Readonly<{
            initialized: boolean;
            isAuthenticated: boolean;
            isLoading: boolean;
            token?: string;
            exchangedToken?: string;
        }>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<import("..").AuthProviderProps<import("keycloak-js").default>>, nextState: Readonly<{
            initialized: boolean;
            isAuthenticated: boolean;
            isLoading: boolean;
            token?: string;
            exchangedToken?: string;
        }>, nextContext: any): void;
    };
    contextType?: import("react").Context<any> | undefined;
};
