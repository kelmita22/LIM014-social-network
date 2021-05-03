import Login from './login.js';
import Check from './check.js';
import Header from './header.js';
import viewHome from './home.js';
import Profile from './profile.js';
import ViewDifferent from './404.js';

const components = {
  login: Login,
  check: Check,
  header: Header,
  home: viewHome,
  profile: Profile,
  viewDifferent: ViewDifferent,
};

export { components };
