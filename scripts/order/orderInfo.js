import { cart } from "../../data/cart-class.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/product.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { formatCurrency } from "../../utils/money.js";

export function renderOrderInfo() {
  const today = dayjs();
  const orderDate = today.format('MMMM D');
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

  const html = `
    <div class="info-1">
      <div style="font-weight: 900;">Order Placed:</div>
      <div>${orderDate}</div>
    </div>

    <div class="info-2">
      <div style="font-weight: 900;">Total:</div>
      <div>RM ${formatCurrency(totalCents)}</div>
    </div>
  `;

  document.querySelector('.js-order-info')
    .innerHTML = html;
}