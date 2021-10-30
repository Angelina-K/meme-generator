'use strict';

function onInit() {
  loadSavedStorage();
  renderGallery();
  renderCanvas();
  addListeners();
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
  const srtHtml = imgs.map((img) => {
    const imgId = img.id;
    const strImg = `<div class="img" onclick="onSelectImg(${imgId})"><img src="img/${imgId}.jpg" alt=""></div>`;
    return strImg;
  });

  elGallery.innerHTML = srtHtml.join('');
}

function toggleMenu() {
  document.body.classList.toggle('menu-open');
}
