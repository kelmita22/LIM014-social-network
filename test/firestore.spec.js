// importamos la funcion que vamos a testear
import {
  validateUser,
  validateNewUser,
} from '../src/js/validation.js';

/** ********Test de validación ******** */
describe('validateUser', () => {
  it('si es un correo valido seria true', () => {
    expect(validateUser('erika.andreina.3@gmail.com')).toBe(true);
  });
  it('si es un correo invalido seria false', () => {
    expect(validateUser('erika5501@')).toBe(false);
  });
});
describe('validateNewUser', () => {
  it('si es un correo valido seria true', () => {
    expect(validateNewUser('erika.andreina.3@gmail.com')).toBe(true);
  });
  it('si es un correo invalido seria false', () => {
    expect(validateNewUser('1234')).toBe(false);
  });
});
