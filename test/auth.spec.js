import auth from '../src/js/authFirebase.js';

const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockFirebase();
const mockfirestore = new firebasemock.MockFirestore();
mockauth.autoFlush();
global.firebase = firebasemock.MockFirebaseSdk(
  (path) => (path ? mockdatabase.child(path) : null),
  () => mockauth,
  () => mockfirestore,
);
describe('Registro de usuarios', () => {
  it('Debería ser una función', () => {
    expect(typeof auth.signUp).toBe('function');
  });
});

describe('Registrar usuarios', () => {
  it('Debería poder registrar usuario con mail y password', () => {
    auth.signUp('test-anayfernandez95@gmail.com', '123456')
      .then((user) => {
        expect(user.email).toBe('test-anayfernandez95@gmail.com');
      });
  });
});

describe('Inicio de sesión', () => {
  it('Debería poder iniciar sesión con email y contraseña', () => {
    auth.signIn('test-anayfernandez95@gmail.com', '123456')
      .then((user) => {
        expect(user.email).toBe('test-anayfernandez95@gmail.com');
      });
  });
});

describe('Inicio de sesion con facebook', () => {
  it('Debería ser una funcion', () => {
    expect(typeof auth.loginFacebook).toBe('function');
  });
  it('Deberia poder iniciar sesión', () => auth.loginFacebook()
    .then((user) => {
      expect(user.isAnonymous).toBe(false);
    }));
});

describe('Inicio de sesion con google', () => {
  it('Debería ser una funcion', () => {
    expect(typeof auth.loginGoogle).toBe('function');
  });

  it('Deberia poder iniciar sesión', () => auth.loginGoogle()
    .then((user) => {
      expect(user.isAnonymous).toBe(false);
    }));
});

describe('Verifica si el usuario esta conectado', () => {
  it('deberia ser una función', () => {
    expect(typeof auth.currentUser).toBe('function');
  });

  it('Deberia mostrar el usuario activo', () => {
    expect(auth.currentUser('anayfernandez95@gmail.com', '123456')).toBe(null);
  });
});

describe('Verifica si el valor de current user es nulo', () => {
  it('deberia ser una función', () => {
    expect(typeof auth.isSigned).toBe('function');
  });

  it('deberia retornar un boolean', () => {
    expect(auth.isSigned()).toBe(false);
  });
});
describe('Cerrar sesión', () => {
  it('deberia ser una función', () => {
    expect(typeof auth.signOut).toBe('function');
  });

  it('Debería cerrar sesión del usuario', () => {
    expect(auth.signOut()).toEqual({
      _id: 5, _label: undefined, _result: undefined, _state: undefined, _subscribers: [],
    });
  });
});
