export const orders = JSON.parse(localStorage.getItem('orders')) || [
  // {
  //   productId: '1',
  //   quantity: 1,
  //   deliveryOptionId: '1'
  // }, {
  //   productId: '7',
  //   quantity: 7,
  //   deliveryOptionId: '3'
  // }
];

export function saveToOrder() {
  localStorage.setItem('orders', JSON.stringify(orders));
}