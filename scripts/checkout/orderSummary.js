import { cart } from "../../data/cart-class.js";
import { getProduct } from "../../data/product.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { getDeliveryOption, deliveryOptions } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderEmptyCart } from "./emptyCart.js";
import { renderEmptyPayment } from "./emptyCart.js";

export function renderOrderSummary() {

  let ordersHTML = '';

  cart.cartItems.forEach((cartItem) => {
    
    const productId = cartItem.productId; 
    const matchingProduct = getProduct(productId);
    const productImage = matchingProduct.image;
    const productName = matchingProduct.name;
    const productPriceCents = matchingProduct.priceCents;
    const productQuantity = cartItem.quantity;
    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);
    const today = dayjs();
    const deliveryDates = today.add(deliveryOption.deliveryDays, 'days');
    const deliveryDatesString = deliveryDates.format('dddd, MMMM D');

    ordersHTML += `
      <div class="order-container js-order-container-${matchingProduct.id}">
        <div class="order-info-container">
          <div class="delivery-date-container">
            <span class="delivery-date">Delivery date: 
              ${deliveryDatesString}
            </span>
          </div>
          <div class="product-details-container">
            <div class="product-image-container">
              <img src=${productImage}>
            </div>
            <div class="product-info-container">
              <div class="product-name">${productName}</div>
              <div class="price">RM ${(productPriceCents/100).toFixed(2)}</div>
              <section class="quantity-selector">
                <div class="item-quantity">
                  Quantity: <span class="quantity-link">${productQuantity}</span>
                </div>
                  <div class="quantity-input-container">
                    <input type="number" class="quantity-input js-quantity-input-${productId}"
                    data-product-id="${productId}"/>
                  </div>
                  <div>
                    <span class="save-button js-save-button"
                    data-product-id="${productId}">
                      Save
                    </span>
                  </div>
                <div>
                  <span class="update-quantity-link js-update-link"
                  data-product-id="${productId}"
                  >
                    Update
                  </span>
                </div>
                <div>
                  <span class="delete-link js-delete-link"
                  data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </section>
            </div>
            <div class="delivery-option-container">
              <section>
                <span class="delivery-option-title">
                  Choose a delivery option
                </span>

                ${renderDeliveryOptions(cartItem, matchingProduct)}

              </section>
            </div>
          </div>
        </div>
        
      </div>
    `;
  });

  function renderDeliveryOptions(cartItem, matchingProduct) {
    let html = '';

    deliveryOptions.forEach((option) => {
      
      const today = dayjs();
      const deliveryDates = today.add(option.deliveryDays, 'days');
      const deliveryDatesString = deliveryDates.format('dddd, MMMM D')
      const deliveryCostCents = option.priceCents === 0 ? 'FREE ' : `RM ${((option.priceCents)/100).toFixed(2)} - `;
      const isChecked = option.id === cartItem.deliveryOptionId;

      html += `
        <div class="delivery-option-container
          js-option-container"
          data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${option.id}"
        >
          <input type="radio"
          class="input-selector"
          ${isChecked ? 'checked' : ''}
          name="delivery-option-${matchingProduct.id}"
          >
          <div class="spacer">
            <div>
              <div class="delivery-date-option">${deliveryDatesString}</div>
            </div>
            <div>
              <div>${deliveryCostCents}Shipping</div>
            </div>
          </div>
        </div>
      `;
    })

    return html;
  }

  document.querySelector('.js-order-grid')
    .innerHTML = ordersHTML;
  
  
  document.querySelector('.js-cart-quantity')
    .innerHTML = cart.calculateCartQuantity();

  document.querySelectorAll('.js-option-container')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const { productId, deliveryOptionId } = element.dataset;
        cart.updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
      });
    });

  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const { productId } = link.dataset;
        cart.removeCart(productId);

        const container = document.querySelector(`
          .js-order-container-${productId}`
        );
        container.remove();
    
        if (cart.cartItems.length === 0) {
          renderEmptyCart();
          renderEmptyPayment();
        } else {
          renderOrderSummary();
          renderPaymentSummary();
        }

        document.querySelector('.js-cart-quantity')
          .innerHTML = cart.calculateCartQuantity();
      });
    });

  document.querySelectorAll('.js-update-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const { productId } = link.dataset;
        const container = document.querySelector(`.js-order-container-${productId}`);

        container.classList.add('is-editing-quantity');
      });
    });

  document.querySelectorAll('.js-save-button')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const { productId } = link.dataset;
        const container = document.querySelector(`.js-order-container-${productId}`);

        const quantitySelector = document.querySelector(`.js-quantity-input-${productId}`);
        const newQuantity = Number(quantitySelector.value);

        if(!newQuantity) {
          alert('Enter a value');
        } else if (newQuantity < 0 || newQuantity >= 100) {
          alert('Product quantity must be in at least 0 and below 1000.')
        } else {
          cart.updateCartQuantity(productId, newQuantity);

          container.classList.remove('is-editing-quantity');
  
          renderOrderSummary();
          renderPaymentSummary();
        }
      });
    });
}
