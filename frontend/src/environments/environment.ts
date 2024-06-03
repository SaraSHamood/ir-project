/* eslint-disable @typescript-eslint/typedef */
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const DOMAIN = {
  serverDev: 'http://127.0.0.1:8000',
  serverDev2: 'http://127.0.0.1:3500',
};

export const environment = {
  type: 'dev',
  production: false,
  CURRENT_DOMAIN: DOMAIN.serverDev,
  TAGS_DOMAIN: DOMAIN.serverDev2,
};
