import { calculateCartQuantity } from "../data/cart.js";

document.querySelector('.js-cart-quantity')
  .innerHTML = calculateCartQuantity();