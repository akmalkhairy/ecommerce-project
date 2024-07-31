import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/product.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { calculateCartQuantity } from "../../data/cart.js";
import { formatCurrency } from "../../utils/money.js";

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
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
        <div>Item (${calculateCartQuantity()}):</div>
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
        <a href="orders.html">
          <button class="place-order-button">Place Order</button>
        </a>
      </div>
    </div>
  `;

  document.querySelector('.js-payment-info-container')
    .innerHTML = paymentHTML;
}