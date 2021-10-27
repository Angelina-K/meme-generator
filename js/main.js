'use strict';
function onInit() {
  console.log('into rendercanvas');
  renderCanvas();
  console.log('rendered canvas from init');

  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('resize', () => {
    console.log('resized');
    resizeCanvas();

    // drawText('changed' + Date.now(), 0, 225)
  });
  //   drawImgFromlocal();
}
