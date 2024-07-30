export const cart = JSON.parse(localStorage.getItem('cart')) || [
  {
    productId: '1',
    quantity: 1,
    deliveryOptionId: '1'
  }, {
    productId: '2',
    quantity: 2,
    deliveryOptionId: '3'
  }
];

export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {

  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  const selectedElement = document.querySelector(`.js-quantity-selector-${productId}`);
  const selectedQuantity = Number(selectedElement.value);

  if (matchingItem) {
    matchingItem.quantity += selectedQuantity;
  } else {
    cart.push({
      productId: productId,
      quantity: selectedQuantity,
      deliveryOptionId: '1'
    });
  }

}

export function calculateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  })
  return cartQuantity;
}

