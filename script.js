/* eslint-disable sonarjs/no-use-of-empty-return-value */
// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!
const items = document.querySelector('.items');
const itemCarrinho = document.querySelector('.cart__items');

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
// const getIdFromProductItem = (product) => product.querySelector('span.id').innerText;

const sumTotal = () => {
  const classPrice = document.querySelector('.total-price');
  const itemsCart = document.querySelectorAll('.cart__item');
  let sumPrice = 0;
  itemsCart.forEach((item) => {
  sumPrice += item.price;
  });
  classPrice.innerText = `SubTotal: R$ ${sumPrice}`;
};

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */

const cartItemClickListener = (element) => {
  element.target.remove();
  sumTotal();
};
const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.price = price;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const func = async (item) => {
  const elementItem = await fetchItem(item.id);
      const result = itemCarrinho.appendChild(createCartItemElement(elementItem));
      if (localStorage.cartItems) {
        const teste = JSON.parse(getSavedCartItems('cartItems'));
        teste.push({ item });
        saveCartItems('cartItems', JSON.stringify(teste));
      } else {
        saveCartItems('cartItems', JSON.stringify([{ item }]));
      }
      sumTotal();
      return result;
};

const resultApi = async () => {
 items.innerHTML += '<div class="loading">Carregando...</div>';
 const retorno = await fetchProducts('computador');
 const loading = document.querySelector('.loading');
    items.removeChild(loading);
    retorno.forEach((item) => {
    const creatProduct = createProductItemElement(item);
    const creatButton = creatProduct.querySelector('.item__add');
    creatButton.addEventListener('click', async () => {
      await func(item);
    });
    items.appendChild(creatProduct);
 });
};

const itemsCarLocal = () => {
  const addLocal = itemCarrinho;
  const retunrFunc = JSON.parse(getSavedCartItems('cartItems'));
  retunrFunc.forEach((element) => {
    addLocal.appendChild(createCartItemElement(element.item));
  });
  sumTotal();
};

const removeItems = () => {
  const buttonRemove = document.querySelector('.empty-cart');
  const teste = document.querySelector('.cart__items');
  buttonRemove.addEventListener('click', () => {
   teste.innerHTML = '';
   localStorage.clear();
   sumTotal();
  });
};

window.onload = () => {
  resultApi();
  if (localStorage.cartItems) itemsCarLocal();
  removeItems();
 };
