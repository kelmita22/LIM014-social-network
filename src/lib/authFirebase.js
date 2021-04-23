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

export default {
  singUp,
  singIn,
};
