const usersCollection = 'users';
function add(uid, user) {
  return firebase.firestore().collection(usersCollection).doc(uid).set(user);
}

function get(uid) {
  return firebase.firestore().collection(usersCollection).where('uid', '==', uid);
}

export default {
  add,
  get,
};
