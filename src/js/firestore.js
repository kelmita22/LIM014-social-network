// ------------------------envio de información de usuario --------------------------
export const sendDataCurrentUser = (user) => {
  const db = firebase.firestore();
  let Photo;
  let Name;
  if (user.photoURL != null && user.displayName != null) {
    Photo = user.photoURL;
    Name = user.displayName;
  } else {
    Photo = './imageProject/avatar.png';
    Name = 'User';
  }
  return db.collection('SN_Users').doc(user.uid).set({
    username: Name,
    email: user.email,
    photo: Photo,
    photoCover: Photo,
    profesión: 'Profesión',
  });
};
// ------------------------Obteniendo información del usuario --------------------------
export const getDataUser = (userId) => {
  const db = firebase.firestore();
  return db.collection('SN_Users').doc(userId).get();
};
// ------------------------Actualizando información  -----------------------
export const updateCurrentUser = (userId, Username, Profesión) => {
  const db = firebase.firestore();
  return db.collection('SN_Users').doc(userId).update({
    username: Username,
    profesión: Profesión,
  });
};
// ----------------------------------- Creando BD POST --------------------------------------
export const addPost = (UserId, Privacy, Publication, URLimg) => {
  const db = firebase.firestore();
  return db.collection('SN_Post').add({
    userId: UserId,
    date: new Date().toLocaleString(),
    privacy: Privacy,
    publication: Publication,
    urlimg: URLimg,
    likes: [],
  });
};
// ------------------------------------- Obteniendo BD POST -----------------------------------
export const getPosts = (callback) => {
  const db = firebase.firestore();
  db.collection('SN_Post').orderBy('date', 'desc')
    .onSnapshot((querySnapshot) => {
      const post = [];
      querySnapshot.forEach((doc) => {
        post.push({ id: doc.id, ...doc.data() });
      });
      callback(post);
    });
};
// --------------------------------------- Creando BD comentarios -------------------------------
export const addComment = (UserId, idPost, Comment) => {
  const db = firebase.firestore();
  return db.collection('SN_Post').doc(idPost).collection('SN_Comment').add({
    userId: UserId,
    date: new Date().toLocaleString(),
    comment: Comment,
  });
};
// ----------------------------------- Obteniendo BD comentarios ----------------------------------
export const getComment = (idPost, callback) => {
  const db = firebase.firestore();
  db.collection(`SN_Post/${idPost}/SN_Comment`).orderBy('date', 'desc')
    .onSnapshot((querySnapshot) => {
      const comment = [];
      querySnapshot.forEach((doc) => {
        comment.push({ id: doc.id, ...doc.data() });
      });
      callback(comment);
    });
};
// --------------------------------------- Borrar un POST -------------------------------------
export const deletePost = (idPost) => {
  const db = firebase.firestore();
  return db.collection('SN_Post').doc(idPost).delete();
};
// ------------------------------------- Borrar un comentario ------------------------------------
export const deleteComment = (idPost, idComment) => {
  const db = firebase.firestore();
  return db.collection(`SN_Post/${idPost}/SN_Comment`).doc(idComment).delete();
};
// ---------------------------------Actualizar la foto de perfil------------------------------------
export const updatephotoProfile = (userId, photo) => {
  const db = firebase.firestore();
  return db.collection('SN_Users').doc(userId).update({ photo });
};
// ----------------------------------Actualizar foto COVER ------------------------------------
export const updatephotoCover = (userId, photoCover) => {
  const db = firebase.firestore();
  return db.collection('SN_Users').doc(userId).update({ photoCover });
};
// -------------------------------------- Actualizar POST --------------------------------------
export const updatePost = (idPost, updatePublication) => {
  const db = firebase.firestore();
  return db.collection('SN_Post').doc(idPost).update({
    publication: updatePublication,
  });
};
// ---------------------------------------- Actualizar privacidad ---------------------------------
export const updatePrivacy = (id, privacy) => {
  const db = firebase.firestore();
  return db.collection('SN_Post').doc(id).update({ privacy });
};
// ---------------------------------------- Actualizar comentario ---------------------------------
export const updateComment = (idPost, idComment, comment) => {
  const db = firebase.firestore();
  return db.collection(`SN_Post/${idPost}/SN_Comment`).doc(idComment).update({ comment });
};
// ----------------------------------------- Actualizar LIKES -----------------------------------
export const updateLike = (id, likes) => {
  const db = firebase.firestore();
  return db.collection('SN_Post').doc(id).update({ likes });
};
