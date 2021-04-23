import { changeView } from './view-controller/index.js';
import configurationKeys from './lib/configurationKeys.js';

const init = () => {
  changeView(window.location.hash);
  window.addEventListener('hashchange', () => changeView(window.location.hash));
};

window.addEventListener('load', init);

window.onload = () => {
  configurationKeys();
};
