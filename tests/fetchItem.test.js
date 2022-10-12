require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  test('se é uma função', () => {
    expect(typeof fetchItem).toBe('function')
  })
  test('se a fecth foi chamada', async () => {
    await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalled()
  })
  test('se quando a função for chamada com o argumento MLB1615760527, a função fecth ultiliza o endpoint correto ', async () => {
    const url = 'https://api.mercadolibre.com/items/MLB1615760527'
    await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalledWith(url)
  })
  test('se o retorno da função com o argumento MLB1615760527, a estrutura de dados é igual ao item ', async () => {
   const result = await fetchItem('MLB1615760527')
    expect(result).toEqual(item);
  })
  test('se nao for passado um argumento retorna mensagem de erro You must provide an url', async () => {
    expect(await fetchItem()).toEqual(new Error('You must provide an url'))
  } )
});
