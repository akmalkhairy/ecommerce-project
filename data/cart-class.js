class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

    if (!this.cartItems) {
      this.cartItems = [
        // {
        //   productId: '1',
        //   quantity: 1,
        //   deliveryOptionId: '1'
        // }, {
        //   productId: '2',
        //   quantity: 2,
        //   deliveryOptionId: '2'
        // }
      ];
    }
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  clearCartStorage() {
    localStorage.clear(this.#localStorageKey);
  }

  addToCart(productId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    const selectedElement = document.querySelector(
      `.js-quantity-selector-${productId}`
    );
    const selectedQuantity = Number(selectedElement.value);

    if (matchingItem) {
      matchingItem.quantity += selectedQuantity;
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: selectedQuantity,
        deliveryOptionId: "1",
      });
    }
  }

  calculateCartQuantity() {
    let cartQuantity = 0;
    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
  }

  removeCart(productId) {
    const newCart = [];

    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });

    this.cartItems = newCart;

    this.saveToStorage();
  }

  updateCartQuantity(productId, newQuantity) {
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        cartItem.quantity = newQuantity;
      }
    });

    this.saveToStorage();
  }

  displayCartQuantity() {
    document.querySelector(".js-cart-quantity").innerHTML =
      this.calculateCartQuantity();
  }
}

export const cart = new Cart("cart-oop");
