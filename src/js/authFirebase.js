function singUp(email, password) {
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

function singIn(email, password) {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        resolve(result.user);
      })
      .catch((error) => {
        reject(error.message);
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
  } else {
    firebase.auth().singOut();
  }
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

export default {
  singUp,
  singIn,
  loginGoogle,
  loginFacebook,
};
