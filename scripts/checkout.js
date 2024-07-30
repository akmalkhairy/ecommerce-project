import { calculateCartQuantity } from "../data/cart.js";
import { cart } from "../data/cart.js";
import { getProduct } from "../data/product.js";

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

    ordersHTML += `
      <div class="order-container">
        <div class="order-info-container">
          <div class="delivery-date-container">
            <span class="delivery-date">Delivery date: Wednesday, July 31</span>
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
                <div class="delivery-option-container">
                  <input type="radio" value="option1">
                  <div>
                    <div>
                      <label for="option1">Tuesday, August 6</label>
                    </div>
                    <div>
                      <span>FREE Shipping</span>
                    </div>
                  </div>
                </div>

                <div class="delivery-option-container">
                  <input type="radio" value="option2">
                  <div class="delivery-option-info">
                    <div>
                      <label for="option2">Wednesday, July 31</label>
                    </div>
                    <div>
                      <span>RM 4.99 - Shipping</span>
                    </div>
                  </div>
                </div>

                <div class="delivery-option-container">
                  <input type="radio" value="option3">
                  <div>
                    <div>
                      <label for="option3">Monday, July 29</label>
                    </div>
                    <div>
                      <span>RM 9.99 - Shipping</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
        
      </div>
    `;
  })

  document.querySelector('.js-order-grid')
    .innerHTML = ordersHTML;
}

renderOrderSummary();
