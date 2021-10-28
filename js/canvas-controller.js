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
  img.onload = () => {
    var pattern = gCtx.createPattern(img, 'repeat');
    gCtx.fillStyle = pattern;
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height);

    drawText();
    const currLineIdx = getCurrLineIdx();
    if (meme.lines[currLineIdx].isFocus && meme.lines[currLineIdx].txt)
      focusOnLine();
  };
}

function renderCanvas() {
  gElCanvas = document.querySelector('.canvas');
  gCtx = gElCanvas.getContext('2d');
}

function resizeCanvas() {
  let elContainer = document.querySelector('.output');
  gElCanvas.width = elContainer.offsetWidth;
  gElCanvas.height = elContainer.offsetHeight;
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
