'use strict';

function onInit() {
  loadSavedStorage();
  renderGallery();
  renderCanvas();
  addListeners();
  // window.addEventListener('resize', resizeCanvas);
  // window.addEventListener('resize', () => {
  //   resizeCanvas();
  // });
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
  console.log(imgs);
  let elGallery = document.querySelector('.image-gallery');
  // const emptyImgStr = `<div class="upload-img "><input type="file"  name="image" onchange="onImgInput(event)" />Upload Image</div>`;
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
