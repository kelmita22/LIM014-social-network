const usersCollection = 'users';

function add(uid, user) {
  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection(usersCollection).doc(uid).set(user)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function get(email) {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, '')
      .then((result) => {
        resolve(result.user);
      })
      .catch((error) => {
        reject(error.message);
      });
  });
}

export default {
  add,
  get,
};
