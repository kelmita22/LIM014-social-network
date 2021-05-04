import {
  addPost, getPosts,
} from '../js/firestore.js';
import { sendImgToStorage } from '../js/storage.js';
import { itemPost } from './post.js';

export default (dataCurrentUser) => {
  const viewHome = document.createElement('section');
  const userId = firebase.auth().currentUser.uid;
  viewHome.classList.add('container-home');
  viewHome.innerHTML = `
  <!-- columna -->
  <aside class="profile-section">
    <div class="profile">
      <img class="avatar" src="${dataCurrentUser.photo}"/>
      <h2 id="name"> ${dataCurrentUser.username}</h2>
    </div>
  </aside>

  <!-- media columna -->
  <main class="home-section">
    <!-- Post -->
    <div class="create-post">
      <div class="user">
        <img class="avatar-post" src="${dataCurrentUser.photo}"/>
        <p class="name">${dataCurrentUser.username}</p>
      </div>
      <div class="content-newpost">
        <form id = "form-post">
          <textarea class="text-newpost" placeholder="Share something" spellcheck="false" required></textarea>
          <i id = "remove-img" style="display: none" class="fas fa-times-circle"></i>
          <img id="post-img" class="post-img" src=""/>
          <div class="buttons-bar">
            <label for="upload-img">
              <input type="file" accept="image/jpeg, image/png, image/gif" id="upload-img" class="upload-img">
              <i class="far fa-file-image"><span class="tooltiptext">Upload an image</span></i>
            </label>
            <select class="fa" id="privacy-option">
              <option class="fa" value="public" title = "Public">&#xf57d; </option>
              <option class="fa" value="private" title = "Private">&#xf023; </option>
            </select>
            <button type="submit" id="btn-post" class="btn-post" ><i class="fas fa-paper-plane"></i> Share</button>
          </div>
        </form>
      </div>
    </div>
    <section id="container-post"></section>
  </main>
  <section class="modal-progress">
    <div class="progress">
      <progress value="0" max="100" id="uploader">0%</progress>
      <p id="messageProgress">0%</p>
    </div>
  </section>
  `;

  const postImg = viewHome.querySelector('#post-img');
  const removeImg = viewHome.querySelector('#remove-img');
  const uploadImg = viewHome.querySelector('#upload-img');

  /* ---------------- cargar imagen para publicar ----------------------*/
  uploadImg.addEventListener('change', (e) => {
    // Creamos el objeto de la clase FileReader
    const reader = new FileReader();
    // Leemos el archivo subido y se lo pasamos a nuestro fileReader
    reader.readAsDataURL(e.target.files[0]);
    // Le decimos que cuando este listo ejecute el código interno
    reader.onload = () => {
      postImg.src = reader.result;
    };
    // mostramos el botón de remover imagen
    removeImg.removeAttribute('style');
  });

  /* ------------- REliminar imagen del post --------------------------*/
  removeImg.addEventListener('click', () => {
    postImg.src = '';
    uploadImg.value = '';
    removeImg.style.display = 'none';
  });
  /* ----------------imagenes de ejemplo------------------- */
  /* let myIndex = 0;
  const carousel = () => {
    const x = viewHome.getElementsByClassName('img-aside');
    for (let i = 0; i < x.length; i += 1) {
      x[i].style.display = 'none';
    }
    myIndex += 1;
    if (myIndex > x.length) { myIndex = 1; }
    x[myIndex - 1].style.display = 'block';
    viewHome.querySelector('.img-aside-text').innerHTML = x[myIndex - 1].alt;
    setTimeout(carousel, 2000); // Change image every 2 seconds
  };
  carousel();
*/
  /* ----------- Ventana emergente ------------------*/
  /* viewHome.querySelector('#contact-bottom').addEventListener('click', () => {
    viewHome.querySelector('#contact-bottom').classList.toggle('click');
    viewHome.querySelector('#contact').classList.toggle('viewContact');
  });
  */
  /* ---------------------- guardar post en firestore------------------*/
  const formPost = viewHome.querySelector('#form-post');
  formPost.addEventListener('submit', (e) => {
    e.preventDefault();
    postImg.src = '';
    removeImg.style.display = 'none';
    // llamar a storage
    const fileImg = e.target.closest('#form-post').querySelector('input').files[0];
    const messageProgress = viewHome.querySelector('#messageProgress');
    const modalProgress = viewHome.querySelector('.modal-progress');
    const uploader = viewHome.querySelector('#uploader');
    const privacy = viewHome.querySelector('#privacy-option').value;
    const textPost = viewHome.querySelector('.text-newpost');
    if (fileImg) {
      const uploadTask = sendImgToStorage(fileImg, 'SN-imgPost');
      uploadTask.on('state_changed', (snapshot) => {
      // manejo de la carga
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        modalProgress.classList.add('showModal');
        messageProgress.textContent = 'Tu publicación fue completada exitosamente';
        uploader.value = progress;
      }, () => {
      // fallo de carga
      }, () => {
      // carga exitosa
        uploadTask.snapshot.ref.getDownloadURL()
          .then((downloadURL) => {
            addPost(userId, privacy, textPost.value, downloadURL)
              .then(() => {
                modalProgress.classList.remove('showModal');
                formPost.reset();
              });
          });
      });
    } else {
      addPost(userId, privacy, textPost.value, '')
        .then(() => {
          modalProgress.classList.remove('showModal');
          formPost.reset();
        });
    }
  });
  /* -------------------------- agregar post----------------------*/
  const containerPost = viewHome.querySelector('#container-post');
  getPosts((post) => {
    containerPost.innerHTML = '';
    post.forEach((objPost) => {
      if (objPost.privacy === 'public' || (objPost.privacy === 'private' && objPost.userId === userId)) {
        containerPost.appendChild(itemPost(objPost));
      }
    });
  });
  return viewHome;
};
