import { renderOrderList } from "./order/orderList.js";
import { renderOrderInfo } from "./order/orderInfo.js";
import { renderEmptyOrder } from "./order/emptyOrder.js";
import { orders } from "../data/orderData.js";
import { cart } from "../data/cart-class.js";

cart.clearCartStorage();

if(orders.length === 0) {
  renderEmptyOrder();
} else {
  renderOrderList();
  renderOrderInfo();
}

