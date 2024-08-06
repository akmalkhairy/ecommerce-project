import { cart } from '../data/cart-class.js'

displayCartMobile();

document.querySelector('.js-hamburger-menu')
  .addEventListener('click', () => {
    const container = document.querySelector('.js-header');

    if(!container.classList.contains('is-displaying')) {
      container.classList.add('is-displaying');
    } else {
      container.classList.remove('is-displaying');
    }
  });

document.querySelector('.js-cart-mobile')
  .addEventListener('click', () => {
    window.location.href = 'checkout.html';
  });

document.querySelector('.js-return-orders-mobile')
  .addEventListener('click', () => {
    window.location.href = 'orders.html';
  });

export function displayCartMobile() {
  document.querySelector('.js-cart-mobile')
  .innerHTML = `Cart (${cart.calculateCartQuantity()})`
}