// ---------------------------------------------SIGN IN----------------------------------------
export const signIn = (email, password) => {
  const auth = firebase.auth();
  return auth.signInWithEmailAndPassword(email, password);
};
export const signInForGoogle = () => {
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  return auth.signInWithPopup(provider);
};
export const signInForFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};
// ---------------------------------------------SIGN UP---------------------------------------
export const createUser = (email, password) => {
  const auth = firebase.auth();
  return auth.createUserWithEmailAndPassword(email, password);
};
// Send email to verify created account
export const sendEmail = () => {
  const user = firebase.auth().currentUser;
  return user.sendEmailVerification();
};
// -------------------------------------------SIGN OUT----------------------------------------
export const signOut = () => firebase.auth().signOut();

// --------------------------------------GET CURRENT USER------------------------------------
export const currentUser = () => firebase.auth().currentUser;
