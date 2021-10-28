'use strict';

function onInit() {
  renderGallery();
  renderCanvas();
  addListeners();
  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('resize', () => {
    resizeCanvas();
  });
}

function addListeners() {
  const elCanvas = getCanvas();
  addMouseListeners(elCanvas);
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
  addGalleryImgs();
  const imgs = getAllImgs();
  let elGallery = document.querySelector('.image-gallery');
  const emptyImgStr = `<div class="upload-img img"><input type="file"  name="image" onchange="onImgInput(event)" />Upload Image</div>`;
  const srtHtml = imgs.map((img) => {
    const imgId = img.id;
    const strImg = `<div class="img upload-img" onclick="onSelectImg(${imgId})" style="background-image: url(img/${imgId}.jpg)"></div>`;
    return strImg;
  });

  elGallery.innerHTML = emptyImgStr + srtHtml;
}
