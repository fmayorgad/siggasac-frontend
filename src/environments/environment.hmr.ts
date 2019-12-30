// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  apiUrl: 'http://167.172.127.180:3000',
  apiBaseMain: 'sigasac/v1',
  passwordRegex: '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})',
  production: false,
  useHash: true,
  hmr: true,
  colors: {
    blue: "#2196f3",
    indigo: "#3f51b5",
    purple: "#9c27b0",
    pink: "#e91e63",
    red: "#f44336",
    orange: "#ff9800",
    yellow: "#ffeb3b",
    green: "#4caf50",
    teal: "#009688",
    cyan: "#00bcd4",
    white: "#ffffff",
    gray: "#6c757d",
    graydark: "#343a40",
    primary: "#2196f3",
    secondary: "#6c757d",
    success: "#4caf50",
    info: "#2196f3",
    warning: "#ffeb3b",
    danger: "#f44336",
    light: "#f8f9fa",
    dark: "#343a40",
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
