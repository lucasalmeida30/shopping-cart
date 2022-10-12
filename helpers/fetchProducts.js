const fetchProducts = async (produto) => {
  // seu código aqui
  try {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${produto}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results; 
  } catch (error) {
   return error;
  }
 };
// fetchProducts('computador');
if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
};
}