export default () => {
  const viewHome = `<body>
  <header>
  <section class="navigation">
    <p class="nameUser">Nombre</p>
     <img
          src="./imageProject/bottonBurger.png"
          class="imgBurger"
          alt="Boton hamburgesa"
          width="50"
        />
        <section class="logoDestok">
        <img
          src="./imageProject/logoDestok.png"
          class="imgLogo"
          alt="Logo Wartay"
          width="80"
        /><p>Wartay<p>
        </section>
    <ul><img
          src="./imageProject/cerrar.png"
          class="imgClose"
          alt="Logo Cerrar"
          width="80"
        />
      <a href="#/">LOGOUT</a>
    </ul>
  </section>
  </header>
  
  <main >
  <section class="main">
   <section class="profile">
           <section class="container">
             <img class="camara" src="./imageProject/camara.png" alt="">
             <img src="" alt="">
              <section class="image-container">
                 <img class="perfil" src="./imageProject/avatar.png" />
              </section>
           </section>
           <section class="lower-container">
              <section>
                 <h3> Miss María</h3>
                 <h4>Prof. de Matemáticas</h4>
              </section>
           </section>
  </section>
  <section class="username">
                <input id="mypara" placeholder="¿Que quieres compartir?">
              <section class="post">
                <img id="load" class="postimg" src=" "/>
                <img class="imgbttn" src="./imageProject/subirImagen.png" alt="subir" width="20">
                <button type="button" id="postmypost" class="postmypost" onclick="mypost();">Compartir</button>
              </section>
  </section>
  </section>
  <section class="mainpost">
    <section class="publish"> <p id="user"> Publicado por Miss Maria</p>
                
              <p class="time">En Linea</p></section>
    <p class="quotes">
      Niños tenemos taller hoy a las 4pm.
    </p>
              <section class="likedislike">
                <p class="like">
                  <span id="like">5 </span> likes &nbsp <span id="dislike">0 </span> dislikes
                </p>         
  </section>
  </main>
    </body> `;
  const divElement = document.createElement('div');
  divElement.innerHTML = viewHome;
  divElement.className = 'homePage';

  return divElement;
};
