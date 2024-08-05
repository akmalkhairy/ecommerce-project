export function renderEmptyOrder() {
  	const html = `
      <div>
        You have no orders.
      </div>

      <button class="back-to-home-button js-back-to-home-button">
        Back to home
      </button>
    `;

  document.querySelector('.js-order')
    .innerHTML = html;

  document.querySelector('.js-back-to-home-button')
    .addEventListener('click', () => {
      window.location.href = 'index.html';
    });
}