'use strict';

let gElCanvas;
let gCtx;

function renderCanvas() {
  console.log('rendering canvas');
  gElCanvas = document.querySelector('.canvas');
  gCtx = gElCanvas.getContext('2d');
  drawImgFromlocal();
  // console.log('renderCanvas func', gElCanvas, gCtx);
  // resizeCanvas()
}

function resizeCanvas() {
  let elContainer = document.querySelector('.output');
  gElCanvas.width = elContainer.offsetWidth;
  gElCanvas.height = elContainer.offsetHeight;
  drawImgFromlocal();
}

function drawImgFromlocal() {
  console.log('trying to draw');
  let img = new Image();
  img.src = 'img/1.jpg';
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height); //img,x,y,xend,yend
  };
}
