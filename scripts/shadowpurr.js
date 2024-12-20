import { products } from "../data/product.js";
import { cart } from "../data/cart-class.js";
import { displayCartMobile } from "./header.js";

cart.displayCartQuantity();

function renderProductGrid() {
  let productsHTML = "";

  products.forEach((product) => {
    const productImage = product.image;
    const productName = product.name;
    const productRatingStars = product.rating.stars;
    const productRatingCounts = product.rating.count;
    const productPriceCents = product.priceCents;

    productsHTML += `
      <div class="product-container">
        <div class="image-container">
          <img class="product-image" src=${productImage}>
        </div>
  
        <div class="product-info">
          <div class="product-name-container">
            <span class="product-name">${productName}</span>
          </div>
    
          <div class="rating-container">
            <img class="star-rating" src="images/ratings/rating-${(productRatingStars*10)}.png">
            <span class="count-rating">${productRatingCounts}</span>
          </div>
    
          <div class="display-price">RM ${(productPriceCents/100).toFixed(2)}</div>
    
          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>

            <div class="added-message-container js-added-message-container-${product.id}">
              <div class="added-message-flex">
                <img class="checkmark" src="images/icons/checkmark.png">
                <span class="added-message">Added</span>
              </div>
            </div>  
          </div>
    
          <div class="button-parent-container">
            <button class="add-to-cart-button js-add-cart-button" data-product-id="${product.id}">Add to Cart</button>
          </div>
          
        </div>
  
      </div>
    `
  });

  document.querySelector('.js-product-grid')
    .innerHTML = productsHTML;
}

renderProductGrid();

document.querySelectorAll('.js-add-cart-button')
  .forEach((button) => {
    let timeOutId;
    button.addEventListener('click', () => {
      clearTimeout(timeOutId);
      const productId = button.dataset.productId;
      cart.addToCart(productId);
      cart.saveToStorage();
      cart.displayCartQuantity();

      const container = document.querySelector(`.js-added-message-container-${productId}`);

      container.classList.add('is-added');

      timeOutId = setTimeout(() => {
        container.classList.remove('is-added');
      }, 2000);

      displayCartMobile();
    });
  });