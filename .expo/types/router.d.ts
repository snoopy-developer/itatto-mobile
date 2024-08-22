/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(authMenu)` | `/(authMenu)/` | `/(authMenu)/passwordRecovery` | `/(authMenu)/signUp` | `/(homeMenu)` | `/(homeMenu)/calendar` | `/(homeMenu)/clients` | `/(homeMenu)/homeTab` | `/(homeMenu)/homeTab/` | `/(homeMenu)/marketing` | `/(homeMenu)/messages` | `/(homeMenu)/services` | `/(homeMenu)/staff` | `/_sitemap` | `/api` | `/calendar` | `/clients` | `/homeTab` | `/homeTab/` | `/marketing` | `/messages` | `/modal` | `/passwordRecovery` | `/services` | `/signUp` | `/staff` | `/userSettingsModal`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
