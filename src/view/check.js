export default () => {
  const viewCheck = `<section class="logoDestokp">
  <img src="./imageProject/logoDestok.jpg" alt="logoDestok" >
</section>
<section id="containTwo">
<div class="loginContainer">
<!-- Logo -->   
 <section class="userPass" id="logoCheck"><img src="./imageProject/logoWartay.png" alt="Logo Wartay" width="150">
 </section>
 <!-- Texto inicio --> 
 <section class="userPass"><img src="./imageProject/usuario.jpeg" alt="Logo Registro" width="80">
 </section>
 <p class="userPass">Carga tu foto
 </p>
 <section class="formRegister">
   <h4>Registro de cuenta</h4><hr class="linea">
   <label>Nombre:</label>
   <input class="controls" type="text" placeholder="Ingresa tu nombre" required>
   <label>Apellido:</label>
   <input class="controls" type="text" placeholder="Ingrese su Apellido" required>
   <label>Email:</label>
   <input class="controls" id="email" type="email" placeholder="Ingrese su Correo" required>
   <label>Eres un profesor, estudiante ó padre de familia:</label>
   <select class="controls" name="Orden" >
  <option value="" disabled selected>Ejem.Prof, estudiante, padre</option>
  <option value="az">Profesor</option>
  <option value="za">Profesora</option>
  <option value="za">Padre</option>
  <option value="za">Madre</option>
  <option value="za">Estudiante</option>
  </select>
   <label>Crea tu contraseña:</label>
   <input class="controls" id="password" type="password" placeholder="Ingrese su Contraseña" required>
   <label>Confirma tu contraseña:</label>
   <input class="controls" type="password" placeholder="Confirme Contraseña" required>
    <a id="btnLoginTwo" >Crear cuenta</a>
 </section>
</div>
</section>`;
  const divElement = document.createElement('div');
  divElement.innerHTML = viewCheck;
  divElement.className = 'checkPage';

  return divElement;
};
