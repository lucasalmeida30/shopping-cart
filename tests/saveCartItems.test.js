const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  test('se ao chamar a função com o cartItem como argumento, o metodo localStorage.setItem é chamado', () => {
    saveCartItems('cartItems', 'item')
    expect(localStorage.setItem).toHaveBeenCalled()
  })
  test('se ao chamar a função com o cartItem como argumento, o metodo localStorage.setItem é chamado com dois parametros', () => {
    saveCartItems('cartItems', 'item')
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', 'item')});
})
