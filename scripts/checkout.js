import { calculateCartQuantity } from "../data/cart.js";
import { cart } from "../data/cart.js";
import { getProduct } from "../data/product.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { getDeliveryOption, deliveryOptions } from "../data/deliveryOptions.js";

document.querySelector('.js-cart-quantity')
  .innerHTML = calculateCartQuantity();

function renderOrderSummary() {

  let ordersHTML = '';

  cart.forEach((cartItem) => {
    
    const productId = cartItem.productId; 
    const matchingItem = getProduct(productId);
    const productImage = matchingItem.image;
    const productName = matchingItem.name;
    const productPriceCents = matchingItem.priceCents;
    const productQuantity = cartItem.quantity;
    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);
    const today = dayjs();
    const deliveryDates = today.add(deliveryOption.deliveryDays, 'days');
    const deliveryDatesString = deliveryDates.format('dddd, MMMM D');

    ordersHTML += `
      <div class="order-container">
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
                  Quantity: ${productQuantity}
                </div>
                <div>
                  <span class="update-save-delete-hyperlink">
                    Update
                  </span>
                </div>
                <div>
                  <span class="update-save-delete-hyperlink">
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

                ${renderDeliveryOptions()}
              </section>
            </div>
          </div>
        </div>
        
      </div>
    `;
  });

  function renderDeliveryOptions() {
    let html = '';

    deliveryOptions.forEach((option) => {
      
      const today = dayjs();
      const deliveryDates = today.add(option.deliveryDays, 'days');
      const deliveryDatesString = deliveryDates.format('dddd, MMMM D')
      const deliveryCostCents = option.priceCents === 0 ? 'FREE ' : `RM ${((option.priceCents)/100).toFixed(2)} - `;

      html += `
        <div class="delivery-option-container">
          <input type="radio" value="option1">
          <div>
            <div>
              <label for="option1">${deliveryDatesString}</label>
            </div>
            <div>
              <span>${deliveryCostCents}Shipping</span>
            </div>
          </div>
        </div>
      `;
    })

    return html;
  }

  document.querySelector('.js-order-grid')
    .innerHTML = ordersHTML;
}

renderOrderSummary();
