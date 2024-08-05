import { renderOrderList } from "./order/orderList.js";
import { renderOrderInfo } from "./order/orderInfo.js";
import { renderEmptyOrder } from "./order/emptyOrder.js";
import { orders } from "../data/orderData.js";
orders

if(orders.length === 0) {
  renderEmptyOrder();
} else {
  renderOrderList();
  renderOrderInfo();
}


// renderOrderInfo();
// renderOrderList();


