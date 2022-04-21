// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyBlgU3TmRPfSNMlqQNZwlnEAVT9ixh4r5g",
    authDomain: "demoangular01.firebaseapp.com",
    databaseURL: 'https://demoangular01-default-rtdb.firebaseio.com/',
    projectId: "demoangular01",
    storageBucket: "demoangular01.appspot.com",
    messagingSenderId: "93237334510",
    appId: "1:93237334510:web:95cea5ce7633974753beff",
    measurementId: "G-TFQP5Z0LS8"
  },
  // apiUrl: 'http://localhost:8080'
  apiUrl: 'http://192.168.2.243:8080'
  // apiUrl: 'http://10.30.0.31:8080'
  // apiUrl: 'http://192.168.3.42:8080'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
