import { createUser, sendEmail } from '../js/auth.js';
import { sendDataCurrentUser } from '../js/firestore.js';
import { validateEmail } from '../js/validation.js';

export default () => {
  const viewCheck = document.createElement('section');
  viewCheck.classList.add('container-check');
  viewCheck.innerHTML = `<section class="logoDestokp">
  <img src="./imageProject/logoDestok.jpg" alt="logoDestok" >
</section>
<section id="containTwo">
<div class="loginContainer">
<!-- Logo -->   
 <section class="userPass" id="logoCheck"><img id="imagLogo" src="./imageProject/logoWartay.png" alt="Logo Wartay" width="320">
 </section>
 <!-- Texto inicio --> 
 <section class="formRegister">
 <div class="div-input">
 <i class="fas fa-envelope"></i>
   <input  id="user-name" class="controls" type="text" placeholder="Ingresa tu nombre" required />
   <p class="col-12 error" id="name-error"></p>
   </div>
   <div class="div-input">
 <i class="fas fa-envelope"></i>
   <input  id="user-lastname" class="controls" type="text" placeholder="Ingrese su Apellido" required />
   <p class="col-12 error" id="lastname-error"></p>
   </div>
   <div class="div-input">
   <i class="fas fa-envelope"></i>
   <input class="controls" id="email" type="email" placeholder="Ingrese su Correo" required />
   <p class="col-12 error" id="email-error">
   </p>
   </div>
   <div class="div-input">
   <label>Eres un profesor, estudiante ó padre de familia:</label>
   <select class="controls" name="Orden" >
  <option value="" disabled selected>Ejem.Prof, estudiante, padre</option>
  <option value="az">Profesor</option>
  <option value="za">Profesora</option>
  <option value="za">Padre</option>
  <option value="za">Madre</option>
  <option value="za">Estudiante</option>
  </select>
  </div>
  <div class="div-input">
  <i class="fas fa-lock"></i>
   <input class="controls" id="password" type="password" placeholder="Ingrese su Contraseña" required />
   <span class="tooltiptext">Debes ingresar una contraseña con minimo 6 caracteres</span>
   </div>
   <div class="div-input">
   <i class="fas fa-lock"></i>
   <input class="controls"  id= "password-confirm" type="password" placeholder="Confirme Contraseña" required>
   <p class="col-12 error" id="pass-error"></p>
   <button type="submit" id="btnLoginTwo" class="btnLoginTwo">Crear cuenta</button>
   <p class="col-12 error" id="signup-error"></p>
 </section>
</div>
</section>`;
  /* -----------------------------Iniciar sesión de nuevo----------------------------------- */
  /* const btnLogin = viewCheck.querySelector('#btnLoginTwo');
  btnLogin.addEventListener('click', () => { window.location.hash = ''; }); */
  const checkForm = viewCheck.querySelector('#btnLoginTwo');
  checkForm.addEventListener('click', (e) => {
    e.preventDefault();
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
      const error = viewCheck.querySelector('#error-message');
      createUser(newUserEmail, newUserPass)
        .then((result) => {
          const userData = {
            uid: result.user.uid,
            email: newUserEmail,
            firstnames: newUserName,
            lastnames: newUserLastName,
          };
          sendDataCurrentUser(userData)
            .then(() => {
              sendEmail()
                .then(() => {
                  alert('Registro exitoso, inicie sesión');
                  window.location.hash = '';
                  error.classList.add('successful-message');
                  error.textContent = 'Please check your inbox to verify your account';
                })
                .catch((err) => {
                  error.classList.add('error-message');
                  error.textContent = err.message;
                });
            })
            .catch((err) => {
              error.classList.remove('successful-message');
              error.classList.add('error-message');
              error.textContent = err.message;
              setTimeout(() => {
                error.textContent = '';
              }, 4000);
            });
        });
    }
  });
  return viewCheck;
};
