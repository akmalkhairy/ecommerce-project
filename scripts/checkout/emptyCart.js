import { cart } from "../../data/cart-class.js";
import { getProduct } from "../../data/product.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../../utils/money.js";
import { orders, saveToOrder } from "../../data/orderData.js";
export function renderEmptyCart() {
  let html = '';

  html = `
    <div>
      <div>
        Your cart is empty.
      </div>
      <button class="view-products-button js-view-products-button">
        View products
      </button>
    </div>
  `;

  document.querySelector('.js-order-grid')
    .innerHTML = html;
  
  document.querySelector('.js-view-products-button')
    .addEventListener('click', () => {
      window.location.href = 'index.html';
    });
}

export function renderEmptyPayment() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.cartItems.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents =  totalBeforeTaxCents + taxCents;

  const paymentHTML = `
    <div>
      <section>
        <span class="order-summary-title">
          Order Summary
        </span>
      </section>
      <div class="cost-info-container">
        <div>Item (${cart.calculateCartQuantity()}):</div>
        <div>RM ${formatCurrency(productPriceCents)}</div>
      </div>
      
      <div class="cost-info-container">
        <div>Shipping and handling:</div>
        <div>RM ${formatCurrency(shippingPriceCents)}</div>
      </div>

      
      <div class="cost-info-container">
        <div>Total before tax:</div>
        <div>RM ${formatCurrency(totalBeforeTaxCents)}</div>
      </div>

      
      <div class="cost-info-container">
        <div>Estimated Tax (10%):</div>
        <div>RM ${formatCurrency(taxCents)}</div>
      </div>

      
      <div class="cost-info-container">
        <span class="total-cost">Order Total:</span>
        <span class="order-cost">RM ${formatCurrency(totalCents)}</span>
      </div>
    </div>
    
    <div class="button-container">
      <div>
          <button class="place-order-button js-place-order-button">View products</button>
      </div>
    </div>
  `;

  document.querySelector('.js-payment-info-container')
    .innerHTML = paymentHTML;

  document.querySelector('.js-place-order-button')
    .addEventListener('click', () => {

      cart.cartItems.forEach((cartItem) => {
        const productId = cartItem.productId;
        const quantity = cartItem.quantity;
        const deliveryOptionId = cartItem.deliveryOptionId;
        
        orders.push({
          productId: productId,
          quantity: quantity,
          deliveryOptionId: deliveryOptionId
        });

        saveToOrder();
      });
      
      window.location.href = 'index.html';
    });
}