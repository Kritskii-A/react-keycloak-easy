var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as React from "react";
import isEqual from "react-fast-compare";
/**
 * Create an AuthProvider component to wrap a React app with, it will take care of common AuthClient
 * lifecycle handling (such as initialization and token refresh).
 *
 * @param AuthContext the Auth context to be used by the created AuthProvider
 *
 * @returns the AuthProvider component
 */
export function createAuthProvider(AuthContext) {
    var defaultInitOptions = {
        onLoad: "check-sso",
    };
    var initialState = {
        initialized: false,
        isAuthenticated: false,
        isLoading: true,
        token: undefined,
        exchangedToken: undefined,
    };
    return /** @class */ (function (_super) {
        __extends(KeycloakProvider, _super);
        function KeycloakProvider() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.state = __assign({}, initialState);
            _this.onError = function (event) { return function (error) {
                var onEvent = _this.props.onEvent;
                // Notify Events listener
                onEvent && onEvent(event, error);
            }; };
            _this.updateState = function (event) { return function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, authClient, onEvent, onTokens, isLoadingCheck, tokenExchangeParams, _b, prevInitialized, prevAuthenticated, prevLoading, isLoading, isAuthenticated, idToken, refreshToken, token, newToken, error_1;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.props, authClient = _a.authClient, onEvent = _a.onEvent, onTokens = _a.onTokens, isLoadingCheck = _a.isLoadingCheck, tokenExchangeParams = _a.tokenExchangeParams;
                            _b = this.state, prevInitialized = _b.initialized, prevAuthenticated = _b.isAuthenticated, prevLoading = _b.isLoading;
                            // Notify Events listener
                            onEvent && onEvent(event);
                            isLoading = isLoadingCheck ? isLoadingCheck(authClient) : false;
                            isAuthenticated = isUserAuthenticated(authClient);
                            // Avoid double-refresh if state hasn't changed
                            if (!prevInitialized ||
                                isAuthenticated !== prevAuthenticated ||
                                isLoading !== prevLoading) {
                                this.setState({
                                    initialized: true,
                                    isAuthenticated: isAuthenticated,
                                    isLoading: isLoading,
                                });
                            }
                            idToken = authClient.idToken, refreshToken = authClient.refreshToken, token = authClient.token;
                            onTokens &&
                                onTokens({
                                    idToken: idToken,
                                    refreshToken: refreshToken,
                                    token: token,
                                });
                            if (!(event === "onAuthRefreshSuccess" && tokenExchangeParams && token)) return [3 /*break*/, 4];
                            _c.label = 1;
                        case 1:
                            _c.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.tokenExchange(token, tokenExchangeParams)];
                        case 2:
                            newToken = _c.sent();
                            console.log("Exchanged token:", newToken);
                            // Update state with the new exchanged token
                            this.setState({
                                exchangedToken: newToken,
                            });
                            // Optionally notify token listener with the new exchanged token
                            if (onTokens) {
                                onTokens({ idToken: idToken, refreshToken: refreshToken, token: newToken });
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _c.sent();
                            console.error("Token exchange failed:", error_1);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); }; };
            _this.refreshToken = function (event) { return function () {
                var _a = _this.props, autoRefreshToken = _a.autoRefreshToken, authClient = _a.authClient, onEvent = _a.onEvent;
                // Notify Events listener
                onEvent && onEvent(event);
                if (autoRefreshToken !== false) {
                    // Refresh Keycloak token
                    authClient.updateToken(5);
                }
            }; };
            return _this;
        }
        KeycloakProvider.prototype.componentDidMount = function () {
            this.init();
        };
        KeycloakProvider.prototype.componentDidUpdate = function (_a) {
            var prevAuthClient = _a.authClient, prevInitOptions = _a.initOptions;
            var _b = this.props, initOptions = _b.initOptions, authClient = _b.authClient;
            if (authClient !== prevAuthClient ||
                !isEqual(initOptions, prevInitOptions)) {
                // De-init previous AuthClient instance
                prevAuthClient.onReady = undefined;
                prevAuthClient.onAuthSuccess = undefined;
                prevAuthClient.onAuthError = undefined;
                prevAuthClient.onAuthRefreshSuccess = undefined;
                prevAuthClient.onAuthRefreshError = undefined;
                prevAuthClient.onAuthLogout = undefined;
                prevAuthClient.onTokenExpired = undefined;
                // Reset state
                this.setState(__assign({}, initialState));
                // Init new AuthClient instance
                this.init();
            }
        };
        KeycloakProvider.prototype.init = function () {
            var _a = this.props, initOptions = _a.initOptions, authClient = _a.authClient;
            // Attach Keycloak listeners
            authClient.onReady = this.updateState("onReady");
            authClient.onAuthSuccess = this.updateState("onAuthSuccess");
            authClient.onAuthError = this.onError("onAuthError");
            authClient.onAuthRefreshSuccess = this.updateState("onAuthRefreshSuccess");
            authClient.onAuthRefreshError = this.onError("onAuthRefreshError");
            authClient.onAuthLogout = this.updateState("onAuthLogout");
            authClient.onTokenExpired = this.refreshToken("onTokenExpired");
            authClient
                .init(__assign(__assign({}, defaultInitOptions), initOptions))
                .catch(this.onError("onInitError"));
        };
        KeycloakProvider.prototype.tokenExchange = function (token, tokenExchangeParams) {
            return __awaiter(this, void 0, void 0, function () {
                var authClient, url, response, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            authClient = this.props.authClient;
                            url = "".concat(authClient.authServerUrl, "/realms/").concat(authClient.realm, "/protocol/openid-connect/token");
                            return [4 /*yield*/, fetch(url, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/x-www-form-urlencoded",
                                    },
                                    body: new URLSearchParams(__assign({ grant_type: "urn:ietf:params:oauth:grant-type:token-exchange", subject_token: token }, tokenExchangeParams)),
                                })];
                        case 1:
                            response = _a.sent();
                            if (!response.ok) {
                                throw new Error("Token exchange failed");
                            }
                            return [4 /*yield*/, response.json()];
                        case 2:
                            data = _a.sent();
                            return [2 /*return*/, data.access_token];
                    }
                });
            });
        };
        KeycloakProvider.prototype.render = function () {
            var _a = this.props, children = _a.children, authClient = _a.authClient, LoadingComponent = _a.LoadingComponent;
            var _b = this.state, initialized = _b.initialized, isLoading = _b.isLoading;
            if (!!LoadingComponent && (!initialized || isLoading)) {
                return LoadingComponent;
            }
            return (React.createElement(AuthContext.Provider, { value: __assign(__assign({}, this.state), { authClient: authClient }) }, children));
        };
        return KeycloakProvider;
    }(React.PureComponent));
}
function isUserAuthenticated(authClient) {
    return !!authClient.idToken && !!authClient.token;
}
export default createAuthProvider;
//# sourceMappingURL=provider.js.map