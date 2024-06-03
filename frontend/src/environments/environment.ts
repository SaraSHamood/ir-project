/* eslint-disable @typescript-eslint/typedef */
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const DOMAIN = {
  serverDev: 'http://localhost:8000',
};

export const environment = {
  type: 'dev',
  production: false,
  CURRENT_DOMAIN: DOMAIN.serverDev,
};
