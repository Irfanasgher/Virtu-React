/*import Axios from 'axios';
import { getSessionToken } from '@shopify/app-bridge-utils';
import {Context, useAppBridge} from '@shopify/app-bridge-react';
  const instance = Axios.create();
  // intercept all requests on this Axios instance
  const app = useAppBridge();
  instance.interceptors.request.use(
    function (config) {
      return getSessionToken(app)  // requires an App Bridge instance
        .then((token) => {
          // append your request headers with an authenticated token
          config.headers['Authorization'] = `Bearer ${token}`;
          return config;
        });
    }
  );
  // export your Axios instance to use within your app*/
  const instance;
  export default instance;