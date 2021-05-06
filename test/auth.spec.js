import {
  signIn,
  loginGoogle,
  loginFacebook,
  signUp,
  emailVerification,
  signOut,
  currentUser,
} from '../src/js/auth.js';

const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockFirebase();
const mockfirestore = new firebasemock.MockFirestore();
mockfirestore.autoFlush();
mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  () => null,
  () => mockauth,
  () => mockfirestore,
);

describe('función signIn', () => {
  it('Deberia ser una función', () => {
    expect(typeof signIn).toBe('function');
  });
  it('Debería poder iniciar sesion', () => signIn('front@end.la', '123456')
    .then((user) => {
      expect(user.email).toBe('front@end.la');
    }));
});
describe('función signUp', () => {
  it('Deberia ser una función', () => {
    expect(typeof signUp).toBe('function');
  });

  it('Debería poder registrarse', () => signUp('front@end.la', '123456')
    .then((user) => {
      expect(user.email).toBe('front@end.la');
    }));
  it('Debería ser una funcion', () => {
    expect(typeof emailVerification).toBe('function');
  });
  // eslint-disable-next-line jest/no-focused-tests
});
describe('Debería poder iniciar sesion con cuenta de facebook', () => {
  it('Debería ser una funcion', () => {
    expect(typeof loginFacebook).toBe('function');
  });
  it('Deberia poder iniciar sesión', () => loginFacebook()
    .then((user) => {
      expect(user.isAnonymous).toBe(false);
    }));
});
describe('Debería poder iniciar sesion con cuenta de google', () => {
  it('Debería ser una funcion', () => {
    expect(typeof loginGoogle).toBe('function');
  });
  it('Deberia poder iniciar sesión', () => loginGoogle()
    .then((user) => {
      expect(user.isAnonymous).toBe(false);
    }));
});
describe('Debería poder cerrar sesión', () => {
  it('Debería ser una funcion', () => {
    expect(typeof signOut).toBe('function');
  });
});
describe('Debería poder obtener datos del usuario', () => {
  it('Debería ser una funcion', () => {
    expect(typeof currentUser).toBe('function');
  });
});
