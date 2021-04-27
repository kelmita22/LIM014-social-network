function signUp(email, password) {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        resolve(result.user);
      })
      .catch((error) => {
        reject(error.message);
      });
  });
}
// verificacion de correo
function emailVerification() {
  const user = firebase.auth().currentUser;
  user.sendEmailVerification().then(() => {
    console.log('enviamos correo');
  }).catch((error) => {
    console.log(error);
  });
}

function signIn(email, password) {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        resolve(result.user);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
// Función para entrar por gmail

function loginGoogle() {
  if (!firebase.auth().currentUser) {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result.user.displayName);
        window.location.hash = '#/home';
      })
      .catch((error) => {
        console.error(error);
      });
  } /* else {
    firebase.auth().singOut();
  } */
}
// Función para entrar por facebook
function loginFacebook() {
  if (!firebase.auth().currentUser) {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result.user.displayName);
        window.location.hash = '#/home';
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    firebase.auth().singOut();
  }
}
// funcion para cerrar sesion
/*
function signOut() {
  if (confirm('¿Realmente deseas cerrar sesión?')) {
    firebase.auth().signOut()
      .then(() => {
        window.location.hash = '';
      }).catch((error) => {
      });
  }
} */

export default {
  signUp,
  signIn,
  loginGoogle,
  loginFacebook,
  emailVerification,
};
