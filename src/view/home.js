import {
  postAdd, getPost,
} from '../js/firestore.js';
import { imgStorage } from '../js/storage.js';
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
              <option class="fa" value="public" title = "Public">&#xf57d; </option>
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

  // Función para cargar imagen para publicar
  uploadImg.addEventListener('change', (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      postImg.src = reader.result;
    };
    removeImg.removeAttribute('style');
  });
  // Eliminar imagen del post
  removeImg.addEventListener('click', () => {
    postImg.src = '';
    uploadImg.value = '';
    removeImg.style.display = 'none';
  });
  // Guardar post en firestore
  const formPost = viewHome.querySelector('#form-post');
  formPost.addEventListener('submit', (e) => {
    e.preventDefault();
    postImg.src = '';
    removeImg.style.display = 'none';
    const fileImg = e.target.closest('#form-post').querySelector('input').files[0];
    const uploader = viewHome.querySelector('#uploader');
    const privacy = viewHome.querySelector('#privacy-option').value;
    const textPost = viewHome.querySelector('.text-newpost');
    const modalProgress = viewHome.querySelector('.modal-progress');
    const messageProgress = viewHome.querySelector('#messageProgress');

    if (fileImg) {
      const uploadTask = imgStorage(fileImg, 'SN-imgPost');
      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        modalProgress.classList.add('showModal');
        messageProgress.textContent = 'Tu publicación fue completada exitosamente';
        uploader.value = progress;
      },
      () => {
      }, () => {
        uploadTask.snapshot.ref.getDownloadURL()
          .then((downloadURL) => {
            postAdd(userId, privacy, textPost.value, downloadURL)
              .then(() => {
                modalProgress.classList.remove('showModal');
                formPost.reset();
              });
          });
      });
    } else {
      postAdd(userId, privacy, textPost.value, '')
        .then(() => {
          modalProgress.classList.remove('showModal');
          formPost.reset();
        });
    }
  });
  /* -------------------------- agregar post----------------------*/
  const containerPost = viewHome.querySelector('#container-post');
  getPost((post) => {
    containerPost.innerHTML = '';
    post.forEach((objPost) => {
      if (objPost.privacy === 'public' || (objPost.privacy === 'private' && objPost.userId === userId)) {
        containerPost.appendChild(itemPost(objPost));
      }
    });
  });
  return viewHome;
};
