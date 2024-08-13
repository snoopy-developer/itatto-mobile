/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(authMenu)` | `/(authMenu)/` | `/(authMenu)/passwordRecovery` | `/(authMenu)/singUp` | `/(homeMenu)` | `/(homeMenu)/` | `/(homeMenu)/two` | `/_sitemap` | `/api` | `/modal` | `/passwordRecovery` | `/singUp` | `/two`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
