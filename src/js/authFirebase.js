// Función para registrarse
function signUp(email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}
/*
// verificacion de correo
function emailVerification() {
  const user = firebase.auth().currentUser;
  user.sendEmailVerification().then(() => {
    console.log('enviamos correo');
  }).catch((error) => {
    console.log(error);
  });
}
*/
// Función para loguearse
function signIn(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

// Función para desloguearse
function signOut() {
  return firebase.auth().signOut();
}
// verifica si el usuario está conectado
function isSigned() {
  return !!(firebase.auth().currentUser);
}

function currentUser() {
  return firebase.auth().currentUser;
}

// Función para entrar por gmail
function loginGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
}

// Función para entrar por facebook
function loginFacebook() {
  const provider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(provider);
}
export default {
  signUp,
  signIn,
  isSigned,
  currentUser,
  signOut,
  loginGoogle,
  loginFacebook,
  // emailVerification,
};
