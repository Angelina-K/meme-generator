'use strict';
function onInit() {
  renderGallery();
  renderCanvas();
  addListeners();

  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('resize', () => {
    console.log('resized');
    resizeCanvas();
  });
}

function addListeners() {
  const elCanvas = getCanvas();
  addMouseListeners(elCanvas);
  // addTouchListeners();
}

function addMouseListeners(elCanvas) {
  elCanvas.addEventListener('mousemove', onMove);
  elCanvas.addEventListener('mousedown', onDown);
  elCanvas.addEventListener('mouseup', onUp);
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchmove', onMove);
  gElCanvas.addEventListener('touchstart', onDown);
  gElCanvas.addEventListener('touchend', onUp);
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

// IF TIME PERMITS clean HTML
// function renderBtns(){

// }
