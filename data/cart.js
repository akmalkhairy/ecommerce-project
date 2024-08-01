export let cart = JSON.parse(localStorage.getItem('cart')) || [
  {
    productId: '1',
    quantity: 1,
    deliveryOptionId: '1'
  }, {
    productId: '2',
    quantity: 2,
    deliveryOptionId: '2'
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

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}

export function removeCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  })

  cart = newCart;

  saveToStorage();
}

export function updateCartQuantity(productId, newQuantity) {
  cart.forEach((cartItem) => {
    if(cartItem.productId === productId) {
      cartItem.quantity = newQuantity;
    }
  })

  saveToStorage();
}