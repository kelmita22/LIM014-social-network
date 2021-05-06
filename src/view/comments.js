import { upgradeComment, removeComment, getUserData } from '../js/firestore.js';

export const itemComment = (objComment, idPost) => {
  const commentElement = document.createElement('div');
  commentElement.classList.add('all-comments');
  commentElement.innerHTML = `
    <div>
    <i class="fas fa-ellipsis-v btn-menu-comment"></i>
    <div id="menu-comment-content" class="menu-comment-content">
    <li id="edit-comment"><i class="fas fa-edit select"></i> Edit</li>
    <li id="delete-comment"><i class="fas fa-trash-alt select"></i> Delete</li>
  </div>
</div> 
<div class = "photo-comment-container">
  <img class="avatar-comment" src=""/>
  <div class = "comment-container">
    <p class="name-comment"></p>
    <p class = "comment-text">${objComment.comment}</p>
    <div class = "edit-comment-text-btns">
      <textarea class = "edit-comment-text">${objComment.comment}</textarea>
      <div class = "edit-comment-btns">
        <button type="button" class="btn-save-comment">Save</button>
      </div>
    </div>
    <p class="time-comment">${objComment.date}</p>
  </div>
</div>
  `;
  getUserData(objComment.userId)
    .then((doc) => {
      const avatarComment = commentElement.querySelector('.avatar-comment');
      const nameComment = commentElement.querySelector('.name-comment');
      avatarComment.src = doc.data().photo;
      nameComment.textContent = doc.data().username;
    });
  // Función para mostrar los comentarios
  const btnMenuComment = commentElement.querySelector('.btn-menu-comment');
  btnMenuComment.addEventListener('click', () => {
    commentElement.querySelector('#menu-comment-content').style.display = 'block';
  });
  // Cerrar los comentarios
  window.addEventListener('click', (e) => {
    if (e.target !== btnMenuComment) {
      commentElement.querySelector('#menu-comment-content').style.display = 'none';
    }
  });
  // Constantes para editar y borrar comentarios
  const editComment = commentElement.querySelector('#edit-comment');
  const editCommentText = commentElement.querySelector('.edit-comment-text');
  // editar comentario
  editComment.addEventListener('click', () => {
    commentElement.querySelector('.edit-comment-text-btns').style.display = 'block';
  });
  // actualizar comentario
  const btnSaveComment = commentElement.querySelector('.btn-save-comment');
  btnSaveComment.addEventListener('click', () => {
    upgradeComment(idPost, objComment.id, editCommentText.value);
  });
  // borrar comentario
  const deleteCommentSelect = commentElement.querySelector('#delete-comment');
  deleteCommentSelect.addEventListener('click', () => {
    removeComment(idPost, objComment.id);
  });
  return commentElement;
};
