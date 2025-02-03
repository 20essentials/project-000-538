let html = '';
for (let i = 0; i < 30; i++) {
  html += `<section class="row">
    ${Array(30).fill(`<aside class="hexagon"></aside>`).join('')}
  </section>`;
}
document.body.innerHTML = html;

document.addEventListener('touchstart', e => {
  function handleMove(e) {
    const { clientX, clientY } = e.touches[0];
    const element = document.elementFromPoint(clientX, clientY);
    const isHexagon = element?.classList?.contains('hexagon');
    const isNotActive = !element?.classList?.contains('active');
    if (element && isHexagon && isNotActive) {
      element.classList.add('active');
      setTimeout(() => element.classList.remove('active'), 1000);
    }
  }

  function handleEnd() {
    document.removeEventListener('touchmove', handleMove);
  }

  document.addEventListener('touchmove', handleMove);
  document.addEventListener('touchend', handleEnd);
});
