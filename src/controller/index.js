import auth from '../js/authFirebase.js';
import users from '../js/users.js';

import { components } from '../view/index.js';
import {
  validateEmail,
} from '../js/validation.js';

const changeView = (route) => {
  const container = document.getElementById('container');
  container.innerHTML = '';
  switch (route) {
    case '': {
      window.location.hash = '#';
    }
    // eslint-disable-next-line no-fallthrough
    case '#/': {
      container.appendChild(components.login());
      document.getElementById('btnLogin').addEventListener('click', (event) => {
        event.preventDefault();
        const email = document.getElementById('userEmail').value;
        const password = document.getElementById('userPassword').value;
        /* Validación del dom */
        const emailerror = document.getElementById('emailerror');
        const passerror = document.getElementById('passerror');
        if (email === '' || !validateEmail(email)) {
          emailerror.style.display = 'block';
          emailerror.innerHTML = 'Debes ingresar un correo válido.';
        } else {
          emailerror.style.display = 'none';
          emailerror.innerHTML = '';
          if (password === '' || password.length < 6) {
            passerror.style.display = 'block';
            passerror.innerHTML = 'Debes ingresar una contraseña con minimo 6 caracteres.';
          } else {
            passerror.style.display = 'none';
            passerror.innerHTML = '';
            auth.signIn(email, password).then((user) => {
              console.log('USER: ', user);
            }).catch((error) => {
              switch (error.code) {
                case 'auth/wrong-password':
                  passerror.innerHTML = 'Usuario o contraseña incorrectos';
                  break;
                case 'auth/user-not-found':
                  passerror.innerHTML = 'Usuario no registrado';
                  break;
                default:
                  console.log(error);
                  passerror.innerHTML = 'Problemas con nuestros servicios, vuelva a intentar';
                  break;
              }
              passerror.style.display = 'block';
            });
          }
        }
      });
      document
        .getElementById('btnFacebook')
        .addEventListener('click', () => auth.loginFacebook());

      return document
        .getElementById('btnGmail')
        .addEventListener('click', () => auth.loginGoogle());
    }
    case '#/registrate': {
      container.appendChild(components.check());
      return document
        .getElementById('btnLoginTwo')
        .addEventListener('click', () => {
          const newUserName = document.getElementById('user-name').value;
          const newUserLastName = document.getElementById('user-lastname').value;
          const newUserEmail = document.getElementById('email').value;
          const newUserPass = document.getElementById('password').value;
          const newUserPassConfirm = document.getElementById('password-confirm').value;
          // validando que las contraseñas coincidan
          let validationOk = true;
          if (newUserPass !== newUserPassConfirm) {
            document.getElementById('pass-error').style.display = 'block';
            document.getElementById('pass-error').innerHTML = 'Contraseñas no coinciden';
            document.getElementById('password').value = '';
            document.getElementById('password-confirm').value = '';
            document.getElementById('password').focus();
            validationOk = false;
          } else {
            document.getElementById('pass-error').style.display = 'none';
          }
          // Validando que las contraseñas sean mayor o igua a 6 digitos
          if (newUserPass === '' || newUserPass.length < 6) {
            document.getElementById('pass-error').style.display = 'block';
            document.getElementById('pass-error').innerHTML = 'Debes ingresar una contraseña con minimo 6 caracteres.';
            document.getElementById('password').focus();
            validationOk = false;
          } else {
            document.getElementById('pass-error').style.display = 'none';
          }
          // validando que sea un correo valido
          if (newUserEmail === '' || !validateEmail(newUserEmail)) {
            document.getElementById('email-error').style.display = 'block';
            document.getElementById('email-error').innerHTML = 'Debes ingresar un correo válido.';
            document.getElementById('email').value = '';
            document.getElementById('email').focus();
            validationOk = false;
          } else {
            document.getElementById('email-error').style.display = 'none';
          }
          // validando que ingrese un su nombre
          if (newUserName === '') {
            document.getElementById('name-error').style.display = 'block';
            document.getElementById('name-error').innerHTML = 'Debes ingresar tu nombre';
            validationOk = false;
          } else {
            document.getElementById('name-error').style.display = 'none';
          }
          // validando que ingrese su apellido
          if (newUserLastName === '') {
            document.getElementById('lastname-error').style.display = 'block';
            document.getElementById('lastname-error').innerHTML = 'Debes ingresar tu apellido';
            validationOk = false;
          } else {
            document.getElementById('lastname-error').style.display = 'none';
          }
          if (validationOk) {
            // proceso de registro
            auth
              .signUp(newUserEmail, newUserPass)
              .then((user) => {
                console.log(user);
                const uid = user.uid;
                if (user.email === newUserEmail) {
                  const userData = {
                    email: newUserEmail,
                    firstnames: newUserName,
                    lastnames: newUserLastName,
                  };
                  users
                    .add(uid, userData)
                    .then((result) => {
                      console.log(result);
                      window.location.hash = '#/';
                    }).catch((error) => {
                      console.log('Error: ', error);
                    });
                } else {
                  console.log('No se registro');
                }
              })
              .catch((error) => {
                console.log('Error: ', error);
              });
          }
        });
    }
    case '#/home': {
      container.appendChild(components.home());
      // document.getElementById('btnLogin').addEventListener('click', (event) => {
      //   console.log(event);
      // });

      break;
    }
    default:
      container.appendChild(components.pageError());
      break;
  }
  return 0;
};

export { changeView };
