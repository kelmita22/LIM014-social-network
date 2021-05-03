import { components } from '../view/index.js';
import { getDataUser } from '../js/firestore.js';
import { currentUser } from '../js/auth.js';

const changeView = (route) => {
  const container = document.querySelector('#container');
  window.location.hash = route;
  container.innerHTML = '';
  switch (route) {
    case '#':
    case '#/':
    case '': {
      container.appendChild(components.login());
      break;
    }
    case '#/registrate': {
      container.appendChild(components.check());
      break;
    }
    case '#/home': {
      container.appendChild(components.header());
      document.querySelector('.home-header').style.textDecoration = 'underline';
      const user = currentUser();
      getDataUser(user.uid)
        .then((doc) => {
          container.appendChild(components.home(doc.data()));
        }).catch((error) => {
          console.log('ErrorHome: ', error);
        });
      break;
    }
    case '#/profile': {
      container.appendChild(components.header());
      document.querySelector('.profile-header').style.textDecoration = 'underline';
      const user = currentUser();
      getDataUser(user.uid)
        .then((doc) => {
          container.appendChild(components.profile(doc.data()));
        }).catch((error) => {
          console.log('ErrorHome: ', error);
        });
      break;
    }
    default:
      break;
  }
};

export { changeView };
