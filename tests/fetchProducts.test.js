require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  // fail('Teste vazio');
  test('se é uma função', () => {
    expect(typeof fetchProducts).toBe('function')
  })
  test('se a função fecth foi chamada', async () => {
    await fetchProducts('computador')
    expect(fetch).toHaveBeenCalled()
  })
  test('se a função fecth ultiliza o endpoints correto', async () => {
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    await fetchProducts('computador')
    expect(fetch).toHaveBeenCalledWith(url);
  })
  test('se o retorno da função é igual a computadorSearch', async () => {
    const retorno = await fetchProducts('computador')
    expect(retorno).toEqual(computadorSearch);
  })
  test('se nao for passado um argumento retorna mensagem de erro You must provide an url', async () => {
    expect(await fetchProducts()).toEqual(new Error('You must provide an url'))
  } )
});
