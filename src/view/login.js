export default () => {
  const viewLogin = `<section class="logoDestokp">
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
      <label class="form-input">
        <input id="userEmail" type="text" placeholder="Email" />
      </label>
      <label class="form-input">
        <input id="userPassword" type="password" placeholder="Contraseña" />
      </label>
      <!-- Botón Login -->
      <a id="btnLogin">Login</a>
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
  const divElement = document.createElement('div');
  divElement.innerHTML = viewLogin;
  divElement.className = 'loginPage';

  return divElement;
};
