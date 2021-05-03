import {
  updateCurrentUser, updatephotoProfile, updatephotoCover, getPosts,

} from '../js/firestore.js';

import {
  currentUser,
} from '../js/auth.js';
import { sendImgToStorage } from '../js/storage.js';
import { itemPost } from './post.js';

export default (dataCurrentUser) => {
  const viewProfile = document.createElement('div');
  viewProfile.classList.add('profile-container');
  viewProfile.innerHTML = `
  <div class="profile-content">
  <div class="profile-background">
    <div class="profile-information shadow">
      <div class="cover-page">
        <img class="cover-photo" src="${dataCurrentUser.photoCover}">
      </div>
      <label id="select-cover" for="select-cover-page">
        <input type="file" id="select-cover-page" class="hide" accept="image/jpeg, image/png">
        <span class="edit-cover"><i class="fas fa-camera edit-photo-btn"></i></span>
      </label>
      <div class="profile-photo">
        <img class="photo" src="${dataCurrentUser.photo}">
      </div>
      <label id="select-profile" for="select-photo-profile">
        <input type="file" id="select-photo-profile" class="hide" accept="image/jpeg, image/png">
        <span class="edit-photo"><i class="fas fa-camera edit-photo-btn"></i></span>
      </label>
      <div class="user-information">
      <span class = "edit-info" id="btn-editProfile"><i class="fas fa-edit"><span class="tooltiptext">Edit information</span></i></span>
        <h2 class="user-name">${dataCurrentUser.username}</p>
        <h3>About me</h3>
      </div>
    </div>
  </div>
</div>
<section class ="container-user-post">
  <p> Aún no tienes publicaciónes! </p>
</section>
<section class="modal-container">
  <section class="modal-settings">
    <header class="modalHeader">
      <button class="btn-modalClose"><i class="fa fa-close"></i></button>
      <h2 class="modalTitle">Edit user profile</h2>
      <hr>
    </header>
    <form class="editProfile">
      <div class="grupo">
        <label  for="usernameEdit">User name : </label>
        <input type="text" id="usernameEdit" value="${dataCurrentUser.username}">
      </div>
      <button type="submit" class="btn-update">UPDATE</a></button>
    </form>
  </section>
</section>
<section class="modal-progress">
  <div class="progress">
    <progress value="0" max="100" id="uploader">0%</progress>
    <p id="messageProgress">0%</p>
  </div>
</section>
`;
  /* -----------------cambiar foto de perfil------------------ */
  const selectPhotoProfile = viewProfile.querySelector('#select-photo-profile');
  selectPhotoProfile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const uploadTask = sendImgToStorage(file, 'SN-imgProfile');
    const messageProgress = viewProfile.querySelector('#messageProgress');
    const modalProgress = viewProfile.querySelector('.modal-progress');
    const uploader = viewProfile.querySelector('#uploader');
    uploadTask.on('state_changed', (snapshot) => {
      // Handle progress
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      modalProgress.classList.add('showModal');
      messageProgress.textContent = 'El cambio de foto se ha actualizado correctamente';
      uploader.value = progress;
    }, () => {
      // fallo al cargar
    }, () => {
      // carga exitosa
      uploadTask.snapshot.ref.getDownloadURL()
        .then((downloadURL) => {
          updatephotoProfile(currentUser().uid, downloadURL)
            .then(() => window.location.reload());
        });
    });
  });
  /* -----------------foto de portada ------------------ */
  const selectCoverPage = viewProfile.querySelector('#select-cover-page');
  selectCoverPage.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const uploadTask = sendImgToStorage(file, 'SN-imgCover');
    const messageProgress = viewProfile.querySelector('#messageProgress');
    const modalProgress = viewProfile.querySelector('.modal-progress');
    const uploader = viewProfile.querySelector('#uploader');
    uploadTask.on('state_changed', (snapshot) => {
      // Handle progress
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      modalProgress.classList.add('showModal');
      messageProgress.textContent = 'El cambio de foto se ha actualizado correctamente';
      uploader.value = progress;
    }, () => {
      // fallo de carga
    }, () => {
      // carga exitosa
      uploadTask.snapshot.ref.getDownloadURL()
        .then((downloadURL) => {
          updatephotoCover(currentUser().uid, downloadURL)
            .then(() => window.location.reload());
        });
    });
  });

  /* -----------------abriir perfil de usuario para cambio de foto------------------ */
  const formEditProfile = viewProfile.querySelector('.editProfile');
  const modalContainer = viewProfile.querySelector('.modal-container');
  const btnEditProfile = viewProfile.querySelector('#btn-editProfile');
  btnEditProfile.addEventListener('click' || 'touch', () => {
    modalContainer.classList.add('showModal');
  });
  /* -----------------cerrar modal edición de perfil------------------ */
  const btnModalClose = viewProfile.querySelector('.btn-modalClose');
  btnModalClose.addEventListener('click' || 'touch', (e) => {
    e.preventDefault();
    modalContainer.classList.remove('showModal');
    formEditProfile.reset();
  });
  // cerrar el modal con un click por fuera
  window.addEventListener('click', (e) => {
    if (e.target === modalContainer) {
      modalContainer.classList.remove('showModal');
      formEditProfile.reset();
    }
  });
  /* -----------------enviar la edición del perfil------------------ */
  formEditProfile.addEventListener('submit', (e) => {
    const userId = currentUser().uid;
    e.preventDefault();
    const usernameEdit = viewProfile.querySelector('#usernameEdit').value;
    updateCurrentUser(userId, usernameEdit)
      .then(() => {
        window.location.reload();
      });
  });

  /* ---------------------- agregar post------------------*/
  const containerUserPost = viewProfile.querySelector('.container-user-post');
  const userId = firebase.auth().currentUser.uid;
  getPosts((post) => {
    containerUserPost.innerHTML = '';
    post.forEach((objPost) => {
      if (userId === objPost.userId) {
        containerUserPost.appendChild(itemPost(objPost));
      }
    });
  });
  return viewProfile;
};
