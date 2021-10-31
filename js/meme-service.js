'use strict';
let gMems = [];
let gCurrLineIdx = 0;
let gCurrSticker = -1;

let gFilterBy = 'all';

let gImgs = [];
let gImgfromInput;

let gMeme = {
  selectedImgId: 0,
  selectedLineIdx: 0,
  stickers: [],
  lines: [
    {
      pos: 0,
      txt: '',
      size: 40,
      font: 'Impact',
      align: 'left',
      fillStyle: 'black',
      strokeStyle: 'white',
      lineWidth: 0,
      isFocus: true,
      boxBoundaries: 0,
      isDrag: false,
    },
  ],
};

function createTxtLine(txt = '') {
  if (gMeme.lines.length > 1) gMeme.lines[gCurrLineIdx].isFocus = false;
  const line = {
    pos: 0,
    txt,
    size: 40,
    font: 'Impact',
    align: 'left',
    fillStyle: 'black',
    strokeStyle: 'white',
    lineWidth: 0,
    isFocus: true,
    boxBoundaries: 0,
    isDrag: false,
  };
  gMeme.lines.push(line);
  gCurrLineIdx++;
  return line;
}

function addSticker(stickeriD, stickerPos) {
  console.log('ADD:', stickerPos);
  const sticker = {
    id: stickeriD,
    src: `img/icons/Layer ${stickeriD}.png`,
    pos: stickerPos,
    isDrag: false,
  };
  gMeme.stickers.push(sticker);
  gCurrSticker++;
}
function updateStickerPos(pos) {
  gMeme.stickers[gCurrSticker].pos = pos;
}

function setStickerDrag(value) {
  gMeme.stickers[gCurrSticker].isDrag = value;
}

function changeFont(newFont) {
  gMeme.lines[gCurrLineIdx].font = newFont;
}
function changeTxtColor(input, type) {
  console.log(type);
  const color = input.value;
  gMeme.lines[gCurrLineIdx][type] = color;
}
function updateSaveStatus() {
  gMeme.isForSave = true;
}
function setFilterBy(filterBy) {
  gFilterBy = filterBy;
}

function addGalleryImgs() {
  gImgs = [];
  let id = 0;
  let maxId = 18;

  switch (gFilterBy) {
    case 'cute':
      maxId = 5;
      break;
    case 'funny':
      maxId = 6;
      break;
    case 'animals':
      maxId = 3;
      break;
    case 'babies':
      maxId = 4;
      break;
    case 'movies':
      maxId = 6;
      break;
  }

  while (id < maxId) {
    id++;
    let url =
      gFilterBy === 'all' ? `img/${id}.jpg` : `img/${gFilterBy}/${id}.jpg`;
    const img = { id: id, url: url, keywords: [''] };
    gImgs.push(img);
  }
  console.log(gImgs);
}

function setImgFromInput(img) {
  gImgfromInput = img;
}
function getImgFromInput() {
  return gImgfromInput;
}

function saveTextPos(txtPos) {
  gMeme.lines[gCurrLineIdx].pos = txtPos;
}

function saveBoxSize(idx, boxBoundaries) {
  gMeme.lines[idx].boxBoundaries = boxBoundaries;
}

function moveLine(dx, dy) {
  gMeme.lines[gCurrLineIdx].pos.x += dx;
  gMeme.lines[gCurrLineIdx].pos.y += dy;
}
function moveSticker(dx, dy) {
  gMeme.stickers[gCurrSticker].pos.x += dx;
  gMeme.stickers[gCurrSticker].pos.y += dy;
}

function removeLine() {
  if (!gMeme.lines[gCurrLineIdx].isFocus) return;
  gMeme.lines.splice(gCurrLineIdx, 1);
  if (gCurrLineIdx <= 0) {
    createTxtLine();
    gCurrLineIdx = 0;
    return;
  }
  if (gCurrLineIdx === 1) {
    gCurrLineIdx = 0;
  }
  if (gCurrLineIdx !== 1 && gCurrLineIdx === gMeme.lines.length - 1) {
    gCurrLineIdx--;
  }
}

function isLineClicked(clickedPos) {
  if (!gMeme.lines[gCurrLineIdx].isFocus) {
    return false;
  }
  const { boxBoundaries } = gMeme.lines[gCurrLineIdx];
  if (
    clickedPos.x >= boxBoundaries.x &&
    clickedPos.x <= boxBoundaries.xWidth &&
    clickedPos.y >= boxBoundaries.y &&
    clickedPos.y <= boxBoundaries.yHight
  ) {
    return true;
  } else {
    return false;
  }
}

function isStickerClicked(clickedPos) {
  if (!gMeme.stickers.length) return;
  const pos = gMeme.stickers[gCurrSticker].pos;
  const distance = Math.sqrt(
    (pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2
  );
  if (distance <= 70) return true;
  return false;
}

function setLineDrag(isDrag) {
  if (!gMeme.lines) return;
  gMeme.lines[gCurrLineIdx].isDrag = isDrag;
}

function updateLineWidth(lineWidth, idx) {
  if (!gMeme.lines) return;
  gMeme.lines[idx].lineWidth = lineWidth;
}

function changeLineFocus() {
  gMeme.lines[gCurrLineIdx].isFocus = false;
  if (gCurrLineIdx - 1 < 0) {
    gCurrLineIdx = gMeme.lines.length - 1;
  } else {
    gCurrLineIdx--;
  }
  gMeme.lines[gCurrLineIdx].isFocus = true;
}
function unFocusLine() {
  gMeme.lines[gCurrLineIdx].isFocus = false;
  gMeme.lines[gCurrLineIdx].boxBoundaries = 0;
}

function changeFontSize(sign) {
  gMeme.lines[gCurrLineIdx].size += sign;
}

function updateMemeImg(imgId) {
  gMeme.selectedImgId = imgId;
}

function updateMemeTxt(txt) {
  if (!gMeme.lines) return;
  gMeme.lines[gCurrLineIdx].txt = txt;
}

function getCurrLineIdx() {
  return gCurrLineIdx;
}
function getCurrMeme() {
  return gMeme;
}
function getAllImgs() {
  return gImgs;
}

function updateTxtSide(side) {
  gMeme.lines[gCurrLineIdx].align = side;
}
