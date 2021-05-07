import {
  signIn, loginGoogle, loginFacebook,
} from '../js/auth.js';
import { userData, getUserData } from '../js/firestore.js';

export default () => {
  const viewLogin = document.createElement('section');
  viewLogin.classList.add('container-logIn');
  viewLogin.innerHTML = `
    <section class="logoDestokp">
      <img src="./imageProject/logoDestok.jpg" alt="logoDestokp" />
    </section>
    <section id="containFirst">
      <section class="loginContainer">
    <section>
      <img id="imagLogo"
        src="./imageProject/iconWartay.png"
        alt="Logo Wartay"
        width="320"
      />
    </section>
      <p class="userPass">!Iniciar sesión en Wartay!</p>
      <form id="loginForm">
    <section>
      <input id="userEmail" type="email" placeholder="Email" required />
    </section>
    <section>
      <input id="userPassword" type="password" placeholder="Contraseña" required />
    </section>
      <button type="submit" class="btn-logIn">Login</a></button>
      <p id = "error-message"></p>
      <p class="userPass">o bien ingresa con...</p>
    <section class="links">
      <a href="#/"id="btnFacebook"><img src="./imageProject/f.png" alt="Facebook" width="25" /></a>
      <a href="#/"id="btnGmail"><img src="./imageProject/g.png" alt="Gmail" width="22" /></a>
      </section>
      <p class="userPass">¿No tienes cuenta?<a class="checkIn" href="#/registrate">Registrate </a></p>
      </form>
    </section>
  </section>`;
  // Login
  const btnNewAccount = viewLogin.querySelector('.checkIn');
  btnNewAccount.addEventListener('click', () => { window.location.hash = '#/registrate'; });
  // Función para registarse con Gmail
  const btnGoogle = viewLogin.querySelector('#btnGmail');
  btnGoogle.addEventListener('click', () => {
    loginGoogle()
      .then((data) => {
        getUserData(data.user.uid)
          .then((doc) => {
            if (doc.exists) {
              window.location.hash = '#/home';
            } else {
              userData(data.user)
                .then(() => {
                  window.location.hash = '#/home';
                });
            }
          });
      });
  });
  // Función para registarse con Facebook
  const btnFacebook = viewLogin.querySelector('#btnFacebook');
  btnFacebook.addEventListener('click', () => {
    loginFacebook()
      .then((data) => {
        getUserData(data.user.uid)
          .then((doc) => {
            if (doc.exists) {
              window.location.hash = '#/home';
            } else {
              userData(data.user)
                .then(() => {
                  window.location.hash = '#/home';
                });
            }
          });
      });
  });
  // Función para verificar credenciales
  const signInForm = viewLogin.querySelector('.btn-logIn');
  signInForm.addEventListener('click', (e) => {
    e.preventDefault();
    const email = viewLogin.querySelector('#userEmail').value;
    const password = viewLogin.querySelector('#userPassword').value;
    const error = viewLogin.querySelector('#error-message');
    signIn(email, password)
      .then((data) => {
        if (data.user.emailVerified) {
          getUserData(data.user.uid)
            .then((doc) => {
              if (doc.exists) {
                window.location.hash = '#/home';
              } else {
                userData(data.user)
                  .then(() => {
                    window.location.hash = '#/home';
                  });
              }
            });
        } else {
          error.textContent = 'Revise su bandeja de entrada, para verificar su cuenta';
        }
      })
      .catch((err) => {
        error.textContent = err.message;
        setTimeout(() => {
          error.textContent = '';
        }, 5000);
      });
  });
  return viewLogin;
};
