'use strict';

let gElCanvas;
let gCtx;

function getCanvas() {
  return gElCanvas;
}
function getCtx() {
  return gCtx;
}

function getTextPose(idx) {
  let x = 20;
  let y;
  if (idx === 0) y = 50;
  if (idx === 1) y = gElCanvas.height - 50;
  if (idx === 2) y = gElCanvas.height / 2;
  if (idx > 2) y = gElCanvas.height / 2 + 30;

  return y;
}

function changeCanvasContent() {
  const meme = getCurrMeme();
  const imgFromInput = getImgFromInput();
  let img = new Image();
  if (imgFromInput) {
    img.src = imgFromInput;
  } else {
    img.src = `img/${meme.selectedImgId}.jpg`;
  }
  // img.onload = () => {
  //   var ratio = img.naturalWidth / img.naturalHeight;
  //   var width = gElCanvas.width;
  //   var height = width / ratio;
  //   gCtx.drawImage(img, 0, 0, width, height);

  img.onload = function () {
    gElCanvas.width = img.naturalWidth;
    gElCanvas.height = img.naturalHeight;
    gCtx.drawImage(img, 0, 0);

    drawText();
    const currLineIdx = getCurrLineIdx();
    if (meme.lines[currLineIdx].isFocus && meme.lines[currLineIdx].txt)
      focusOnLine();
  };
}

function renderImgFromInput(img) {
  const ctx = getCtx();
  let elGallery = document.querySelector('.image-gallery');
  elGallery.style.display = 'none';
  document.querySelector('.meme-content').style.display = 'flex';
  // let elCanvas = getCanvas();
  // elCanvas = document.querySelector('.canvas');
  gElCanvas.hidden = false;
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
  resizeCanvas();
}

// var img = new Image();
// img.onload = () => {
//   gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
// };

function renderCanvas() {
  gElCanvas = document.querySelector('.canvas');
  gCtx = gElCanvas.getContext('2d');

  // const heightRatio = 1.5;
  // gElCanvas.height = gElCanvas.width * heightRatio;
}

function addResizeListener() {
  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('resize', () => {
    resizeCanvas();
  });
}

function resizeCanvas() {
  // let elContainer = document.querySelector('.output');
  // gElCanvas.width = elContainer.offsetWidth;
  // gElCanvas.height = elContainer.offsetHeight;
  gCtx.canvas.width = gCtx.canvas.clientWidth;
  gCtx.canvas.height = gCtx.canvas.clientHeight;
  changeCanvasContent();
}

function drawText() {
  let x = 20;
  let y;
  const meme = getCurrMeme();
  meme.lines.forEach((line, idx) => {
    const { txt, size } = meme.lines[idx];
    if (!meme.lines[idx].pos) {
      y = getTextPose(idx);
    } else {
      x = line.pos.x;
      y = line.pos.y;
    }
    gCtx.lineWidth = 1.5;
    gCtx.strokeStyle = 'white';
    gCtx.fillStyle = 'black';
    gCtx.font = `${size}px Impact`;
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);

    const lineWidth = gCtx.measureText(txt).width;
    updateLineWidth(lineWidth, idx);
  });
}

function focusOnLine() {
  drawRect();
}

function drawRect() {
  const idx = getCurrLineIdx();
  const meme = getCurrMeme();
  const txtSize = meme.lines[idx].size;
  const lineWidth = meme.lines[idx].lineWidth;

  let x = 20;
  let y = getTextPose(idx);
  if (meme.lines[idx].pos) {
    x = meme.lines[idx].pos.x;
    y = meme.lines[idx].pos.y;
  }
  gCtx.beginPath();
  gCtx.rect(x - 10, y - 25, lineWidth + 20, txtSize + 20);
  gCtx.fillStyle = '#ffffff00';

  gCtx.stroke();
  const boxBoundaries = {
    x: x - 10,
    y: y - 25,
    xWidth: lineWidth + 20 + x,
    yHight: y + txtSize + 20,
  };
  const txtPos = { x: x, y: y };
  saveTextPos(txtPos);
  saveBoxSize(idx, boxBoundaries);
}

function clearCanvas() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}
