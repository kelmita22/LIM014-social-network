import Login from './login.js';
import Check from './check.js';
import errorPage from './404.js';
import Home from './home.js';

const components = {
  login: Login,
  check: Check,
  home: Home,
  pageError: errorPage,
};

export { components };
