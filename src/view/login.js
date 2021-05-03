import { signIn, signInForGoogle, currentUser } from '../js/auth.js';
import { sendDataCurrentUser, getDataUser } from '../js/firestore.js';

export default () => {
  const viewLogin = document.createElement('section');
  viewLogin.classList.add('container-logIn');
  viewLogin.innerHTML = `<section class="logoDestokp">
  <img src="./imageProject/logoDestok.jpg" alt="logoDestokp" />
</section>
<section id="containFirst">
  <div class="loginContainer">
    <!-- Logo -->
    <section>
      <img
        src="./imageProject/logoWartay.png"
        class="imgLogo"
        alt="Logo Wartay"
        width="150"
      />
    </section>
    <!-- Texto inicio -->
    <p class="userPass">!Iniciar sesión en Wartay!</p>
    <!-- Inputs de ingreso -->
    <form id="loginForm">
    <div class="div-input">
    <i class="fas fa-lock"></i>
        <input id="userEmail" type="email" placeholder="Email" required />
      </div>
      <div class="div-input">
        <i class="fas fa-lock"></i>
        <input id="userPassword" type="password" placeholder="Contraseña" required />
      </div>
      <!-- Botón Login -->
      <button type="submit" class="btn-logIn">Login</a></button>
      <p id = "error-message" class = "error-message"></p>
      <!-- Ingreso con Facebook o Gmail -->
      <p class="userPass">o bien ingresa con...</p>
      <section class="links">
        <a href="#/"id="btnFacebook"
          ><img src="./imageProject/f.png" alt="Facebook" width="25" />
        </a>
        <a href="#/"id="btnGmail"
          ><img src="./imageProject/g.png" alt="Gmail" width="22" />
        </a>
      </section>
      <!-- Registro de cuenta -->
      <p class="userPass">
        ¿No tienes cuenta?<a class="checkIn" href="#/registrate">Registrate </a>
      </p>
    </form>
  </div>
</section>`;
  /* --------------------------------------loguearse------------------------------- */
  const btnNewAccount = viewLogin.querySelector('.checkIn');
  btnNewAccount.addEventListener('click', () => { window.location.hash = '#/check'; });
  const btnGoogle = viewLogin.querySelector('#btnGmail');
  btnGoogle.addEventListener('click', () => {
    signInForGoogle()
      .then(() => {
        getDataUser(currentUser().uid)
          .then((doc) => {
            if (doc.exists) {
              window.location.hash = '#/home';
            } else {
              sendDataCurrentUser(currentUser())
                .then(() => {
                  window.location.hash = '#/home';
                });
            }
          });
      });
  });
  /* ----------------credenciales de inicio de sesión-------------- */
  const signInForm = viewLogin.querySelector('#loginForm');
  signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = viewLogin.querySelector('#email').value;
    const password = viewLogin.querySelector('#password').value;
    const error = viewLogin.querySelector('#error-message');
    signIn(email, password)
      .then((data) => {
        if (data.user.emailVerified) {
          getDataUser(currentUser().uid)
            .then((doc) => {
              if (doc.exists) {
                window.location.hash = '#/home';
              } else {
                sendDataCurrentUser(currentUser())
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
