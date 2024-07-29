import { products } from "../data/product.js";

function renderProductGrid() {

  let productHTML = "";

  products.forEach((product) => {
    const productImage = product.image;
    const productName = product.name;
    const productRatingStars = product.rating.stars;
    const productRatingCounts = product.rating.count;
    const productPriceCents = product.priceCents;

    productHTML += `
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
            <select>
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
          </div>
    
          <div class="button-parent-container">
            <button class="add-to-cart-button">Add to Cart</button>
          </div>
          
        </div>
  
      </div>
    `
  });

  document.querySelector('.js-product-grid')
    .innerHTML = productHTML;
}

renderProductGrid();