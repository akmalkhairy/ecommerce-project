import { orders } from "../../data/orderData.js";
import { cart } from "../../data/cart-class.js";
import { getProduct } from "../../data/product.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export function renderOrderList() {
  let orderHTML = '';

  orders.forEach((order) => {
    const productId = order.productId;
    const product = getProduct(productId);
    const productImage = product.image;
    const productName = product.name;
    const quantity = order.quantity;
    const today = dayjs();
    const deliveryOption = getDeliveryOption(order.deliveryOptionId);
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const deliveryDateString = deliveryDate.format('MMMM D');
  
    orderHTML += `
      <div class="order-info-container-2">
  
        <div class="left-section-1">
          <div class="image-container">
            <img src=${productImage}>
          </div>
          
          <div class="product-info-container">
            <div class="product-title">${productName}</div>
            <div>Arriving On: ${deliveryDateString}</div>
            <div>Quantity: ${quantity}</div>
            <button class="buy-again-button">Buy it again</button>
          </div>
        </div>
        
      </div>
    `;
  });

  document.querySelector('.js-order-list')
    .innerHTML = orderHTML;
  
  cart.clearCartStorage();
}