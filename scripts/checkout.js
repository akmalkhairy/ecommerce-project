import { calculateCartQuantity } from "../data/cart.js";
import { cart } from "../data/cart.js";
import { getProduct } from "../data/product.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { getDeliveryOption, deliveryOptions } from "../data/deliveryOptions.js";

document.querySelector('.js-cart-quantity')
  .innerHTML = calculateCartQuantity();

renderOrderSummary();

function renderOrderSummary() {

  let ordersHTML = '';

  cart.forEach((cartItem) => {
    
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
        <div class="delivery-option-container">
          <input type="radio" 
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
}

function renderPaymentSummary() {
  const cartQuantity = calculateCartQuantity();
  const itemPriceCents = calculateTotalPrice();

  let paymentHTML = '';

  paymentHTML += `
    <div>
      <section>
        <span class="order-summary-title">
          Order Summary
        </span>
      </section>
      <div class="cost-info-container">
        <div>Item (${cartQuantity}):</div>
        <div>RM 100.00</div>
      </div>
      
      <div class="cost-info-container">
        <div>Shipping and handling:</div>
        <div>RM 4.99</div>
      </div>

      
      <div class="cost-info-container">
        <div>Total before tax:</div>
        <div>RM 90.99</div>
      </div>

      
      <div class="cost-info-container">
        <div>Estimated Tax (10%):</div>
        <div>RM 9.90</div>
      </div>

      
      <div class="cost-info-container">
        <span class="total-cost">Order Total:</span>
        <span class="order-cost">RM 109.90</span>
      </div>
    </div>
    
    <div class="button-container">
      <div>
        <a href="orders.html">
          <button class="place-order-button">Place Order</button>
        </a>
      </div>
    </div>
  `;

  return paymentHTML;
}
