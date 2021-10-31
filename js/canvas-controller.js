'use strict';

let gElCanvas;
let gCtx;
let gSavedMems = [];

function loadSavedStorage() {
  const savedMems = loadFromStorage('imgesDB', gSavedMems);
  gSavedMems = !savedMems ? [] : savedMems;
}

function getSavedMems() {
  return gSavedMems;
}

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

function getTxtPoseForAlign(align) {
  let x;
  if (align === 'right') x = gElCanvas.width - 20;
  if (align === 'center') x = gElCanvas.width / 2;
  return x;
}

function changeCanvasContent() {
  const meme = getCurrMeme();
  const imgFromInput = getImgFromInput();

  let img = new Image();
  if (imgFromInput) {
    img.src = imgFromInput;
  } else {
    img.src =
      gFilterBy === 'all'
        ? `img/${meme.selectedImgId}.jpg`
        : `img/${gFilterBy}/${meme.selectedImgId}.jpg`;
  }
  img.onload = function () {
    gElCanvas.width = img.naturalWidth;
    gElCanvas.height = img.naturalHeight;
    gCtx.drawImage(img, 0, 0);

    drawText();
    const currLineIdx = getCurrLineIdx();
    if (
      meme.lines[currLineIdx] &&
      meme.lines[currLineIdx].isFocus &&
      meme.lines[currLineIdx].txt
    ) {
      focusOnLine();
    }

    if (meme.stickers.length) {
      meme.stickers.forEach((sticker) => {
        let stickerImg = new Image();
        stickerImg.src = sticker.src;
        gCtx.drawImage(stickerImg, sticker.pos.x, sticker.pos.y);
        // updateStickerPos()
      });
    }
  };
}

function getCenterPos() {
  const pos = {
    x: gElCanvas.width / 2,
    y: gElCanvas.height / 2,
  };
  return pos;
}

function renderImgFromInput(img) {
  const ctx = getCtx();
  let elGallery = document.querySelector('.image-gallery');
  elGallery.style.display = 'none';
  document.querySelector('.meme-content').style.display = 'flex';
  gElCanvas.hidden = false;
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
  resizeCanvas();
}

function renderCanvas() {
  gElCanvas = document.querySelector('.canvas');
  gCtx = gElCanvas.getContext('2d');
}

function addResizeListener() {
  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('resize', () => {
    resizeCanvas();
  });
}

function resizeCanvas() {
  gCtx.canvas.width = gCtx.canvas.clientWidth;
  gCtx.canvas.height = gCtx.canvas.clientHeight;
  changeCanvasContent();
}

function drawText() {
  let x = 20;
  let y;
  const meme = getCurrMeme();
  meme.lines.forEach((line, idx) => {
    const { txt, size, font, align, fillStyle, strokeStyle } = meme.lines[idx];
    if (!meme.lines[idx].pos) {
      y = getTextPose(idx);
      if (align !== 'left') {
        x = getTxtPoseForAlign(align);
      }
    } else {
      x = line.pos.x;
      y = line.pos.y;
    }

    gCtx.textBaseline = 'top';
    gCtx.textAlign = `${align}`;
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = `${strokeStyle}`;
    gCtx.fillStyle = `${fillStyle}`;
    gCtx.font = `${size}px ${font}`;
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
  if (meme.isForSave || !meme.lines[idx].isFocus) return;
  const { size, txtSize, lineWidth } = meme.lines[idx];
  let x = 20;
  let y = getTextPose(idx);
  if (meme.lines[idx].pos) {
    x = meme.lines[idx].pos.x;
    y = meme.lines[idx].pos.y;
  }
  var fontsize = size;
  var lineHeight = fontsize * 1.286;
  gCtx.beginPath();
  gCtx.rect(x - 10, y - 10, lineWidth + 20, lineHeight + 20);
  gCtx.strokeStyle = 'white';
  gCtx.fillStyle = '#ffffff00';
  gCtx.strokeRect(x - 10, y - 10, lineWidth + 20, lineHeight + 20);

  gCtx.stroke();
  const boxBoundaries = {
    x: x - 10,
    y: y - 10,
    xWidth: x + lineWidth + 20,
    yHight: y + lineHeight + 20,
  };
  const txtPos = { x: x, y: y };
  saveTextPos(txtPos);
  saveBoxSize(idx, boxBoundaries);
}

function clearCanvas() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
  console.log('clearing');
}

// function _prepareMemeForSave() {
//   // clearCanvas();
//   const meme = getCurrMeme();
//   const imgFromInput = getImgFromInput();
//   let img = new Image();
//   if (imgFromInput) {
//     img.src = imgFromInput;
//   } else {
//     img.src = `img/${meme.selectedImgId}.jpg`;
//   }
//   img.onload = function () {
//     gElCanvas.width = img.naturalWidth;
//     gElCanvas.height = img.naturalHeight;
//     gCtx.drawImage(img, 0, 0);
//     console.log('drawing new img');

//     drawText();
//   };
// }

function saveMeme() {
  unFocusLine();
  changeCanvasContent();
  const imgData = getImgData(gElCanvas);
  gSavedMems.push(imgData);

  saveAsImgToStorage('imgesDB', gSavedMems);
}

function getImgData() {
  var dataURL = gElCanvas.toDataURL('image/png');

  return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
}
