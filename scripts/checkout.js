import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderEmptyCart,renderEmptyPayment } from "./checkout/emptyCart.js";
import { cart } from "../data/cart-class.js";

if (cart.cartItems.length === 0) {
  renderEmptyCart();
  renderEmptyPayment();
} else {
  renderOrderSummary();
  renderPaymentSummary();
}