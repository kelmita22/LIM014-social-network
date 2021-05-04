import { signOut } from '../js/auth.js';

export default () => {
  const viewHeader = document.createElement('section');
  viewHeader.classList.add('main-header');
  viewHeader.innerHTML = `
<nav>
  <ul class="menu-header">
    <div id="left-menu-header" class= "box">
      <li class="home-header"><a href="#/home"><i class="fas fa-home"></i>Home</a></li>
      <li class="profile-header"><a href="#/profile"><i class="fas fa-user-circle"></i>Profile</a></li>
    </div>
      <li class="title-header box"><a href="#/home"><img class="logowar" src="./imageProject/logow.png" width="50px">Wartay</a></li>
      <li id="log-out-header" class="box"><span id ="btn-singOut"><i class="fas fa-sign-out-alt"></i>Cerrar Sesión</span></li>
  </ul>
</nav>
<i id="hamburger-menu" class="fas fa-bars hide"></i>
`;
  /* ------------------------- encabezado --------------------- */
  const hamburgerBotton = viewHeader.querySelector('#hamburger-menu');
  const homeNav = viewHeader.querySelector('#left-menu-header');
  const singOut = viewHeader.querySelector('#log-out-header');
  hamburgerBotton.addEventListener('click', () => {
    homeNav.classList.toggle('active');
    singOut.classList.toggle('active');
  });

  // Función para cerrar sesión
  const btnSignOut = viewHeader.querySelector('#btn-singOut');
  btnSignOut.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = '';
    signOut();
    /* .then(() => {
      }); */
  });

  return viewHeader;
};
