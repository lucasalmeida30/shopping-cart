const saveCartItems = (item) => localStorage.setItem('cartItems', item);
  // let itemsCar = document.querySelectorAll('.cart__items');
  // const cartItemList = [];
  // if (cartItem) {
  //   itemsCar = [cartItem];
  //   }
  //   itemsCar.forEach((element) => {
      
  //     cartItemList.push(element);
  //   });
  

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
