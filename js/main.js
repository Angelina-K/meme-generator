'use strict';
function onInit() {
  renderGallery();
  renderCanvas();
  // console.log('rendered canvas from init');

  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('resize', () => {
    console.log('resized');
    resizeCanvas();

    // drawText('changed' + Date.now(), 0, 225)
  });
  //   drawImg();
  //   changeCanvasContent();
}

function renderGallery() {
  const imgs = getAllImgs();
  let elGallery = document.querySelector('.image-gallery');
  const srtHtml = imgs.map((img) => {
    const imgId = img.id;
    const strImg = `<div class="img" onclick="onSelectImg(${imgId})" style="background-image: url(img/${imgId}.jpg)"></div>`;
    return strImg;
  });
  elGallery.innerHTML = srtHtml;
}
