'use strict';

let gElCanvas;
let gCtx;

function changeCanvasContent() {
  const meme = getCurrMeme();
  // drawImgFromlocal(meme.selectedImgId);
  drawText(meme.lines[0].txt);
}

function renderCanvas() {
  console.log('rendering canvas');
  gElCanvas = document.querySelector('.canvas');
  gCtx = gElCanvas.getContext('2d');
  // changeCanvasContent();
  drawImgFromlocal();
  // console.log('renderCanvas func', gElCanvas, gCtx);
  // resizeCanvas()
}

function resizeCanvas() {
  let elContainer = document.querySelector('.output');
  gElCanvas.width = elContainer.offsetWidth;
  gElCanvas.height = elContainer.offsetHeight;
  changeCanvasContent();
  // drawText();
  // drawImgFromlocal();
}

function drawImgFromlocal() {
  console.log('drawing img');
  const meme = getCurrMeme();
  let img = new Image();
  img.src = `img/${meme.selectedImgId}.jpg`;
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height); //img,x,y,xend,yend
  };
}

function drawText() {
  console.log('drwing text');
  // gCtx.font = '48px serif';
  // gCtx.fillText(text, x, y);
  const meme = getCurrMeme();
  const { txt } = meme.lines[0];
  gCtx.lineWidth = 1.5;
  gCtx.strokeStyle = 'white';
  gCtx.fillStyle = 'black';
  gCtx.font = '40px Impact';
  gCtx.fillText(`${txt}`, 20, 50);
  gCtx.strokeText(`${txt}`, 20, 50);
}
