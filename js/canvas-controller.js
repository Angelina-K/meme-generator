'use strict';

let gElCanvas;
let gCtx;

function changeCanvasContent() {
  const meme = getCurrMeme();

  let img = new Image();
  img.src = `img/${meme.selectedImgId}.jpg`;
  img.onload = () => {
    // gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height); //img,x,y,xend,yend
    var pattern = gCtx.createPattern(img, 'repeat');
    gCtx.fillStyle = pattern;
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height);

    // drawText();
  };
  // clearCanvas();
  // renderCanvas();
  // clearCanvas();

  // drawText();
  // gCtx.restore();
}

function renderCanvas() {
  // drawImg(1);
  gElCanvas = document.querySelector('.canvas');
  gCtx = gElCanvas.getContext('2d');
}

function resizeCanvas() {
  let elContainer = document.querySelector('.output');
  gElCanvas.width = elContainer.offsetWidth;
  gElCanvas.height = elContainer.offsetHeight;
  // drawImg();
  changeCanvasContent();
  // drawText();
}

// function drawImg(imgId) {
//   // const meme = getCurrMeme();
//   // if (!meme.selectedImgId) return;
//   // console.log('meme.selectedImgId', meme.selectedImgId);
//   let img = new Image();
//   img.src = `img/${imgId}.jpg`;
//   img.onload = () => {
//     // gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height); //img,x,y,xend,yend
//     var pattern = gCtx.createPattern(img, 'repeat');
//     gCtx.fillStyle = pattern;
//     gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height);
//     drawText();
//   };
// }

function drawText() {
  gCtx.restore();
  const meme = getCurrMeme();

  const currLineIdx = getCurrLine();
  const { txt, size } = meme.lines[currLineIdx];
  let x = 20;
  let y = 50;
  if (currLineIdx === 1) {
    // x = gElCanvas.width - 20;
    y = gElCanvas.width - 50;
  }
  gCtx.lineWidth = 1.5;
  gCtx.strokeStyle = 'white';
  gCtx.fillStyle = 'black';
  gCtx.font = `${size}px Impact`;
  gCtx.fillText(`${txt}`, x, y);
  gCtx.strokeText(`${txt}`, x, y);

  gCtx.save();
  // gCtx.font = '48px serif';
  // gCtx.fillText(text, x, y);
}

function clearCanvas() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
  // drawImg(1);
}
function clearPartCanvas() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
  // drawImg(1);
}
