import { changeView } from './controller/index.js';
import configurationKeys from './js/configurationKeys.js';

const init = () => {
  changeView(window.location.hash);
  window.addEventListener('hashchange', () => changeView(window.location.hash));
};

window.addEventListener('load', init);

window.onload = () => {
  configurationKeys();
};
