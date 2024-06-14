// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Config } from './config.interface';

export const environment: Config = {
  production: false,
  apiEndpoints: {
    product: 'https://iwi5536eyj.execute-api.eu-north-1.amazonaws.com/prod/',
    order: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
    import: 'https://1rgjo8gc9b.execute-api.eu-north-1.amazonaws.com/prod/',
    bff: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
    cart: 'https://vn4yl0na4j.execute-api.eu-north-1.amazonaws.com/prod/api/profile/cart',
  },
  apiEndpointsEnabled: {
    product: true,
    order: false,
    import: true,
    bff: false,
    cart: true,
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
