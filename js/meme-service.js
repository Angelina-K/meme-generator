'use strict';
// let gKeywords = {'happy': 12,'funny puk': 1}
let gMems = [];
let gCurrLineIdx = 0;

let gImgs = [];
let gImgfromInput;

let gMeme = {
  selectedImgId: 0,
  selectedLineIdx: 0,
  lines: [
    {
      pos: 0,
      txt: '',
      size: 20,
      align: 'left',
      color: 'black',
      lineWidth: 0,
      isFocus: true,
      boxBoundaries: 0,
      isDrag: false,
    },
  ],
};

function createTxtLine(txt = '') {
  gMeme.lines[gCurrLineIdx].isFocus = false;
  const line = {
    pos: 0,
    txt,
    size: 20,
    align: 'left',
    color: 'black',
    lineWidth: 0,
    isFocus: true,
    boxBoundaries: 0,
    isDrag: false,
  };
  gMeme.lines.push(line);
  gCurrLineIdx++;
  return line;
}

function addGalleryImgs() {
  let id = 0;
  while (id < 18) {
    id++;
    const img = { id: id, url: `img/${id}.jpg`, keywords: [''] };
    gImgs.push(img);
  }
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
  console.log('moving line');
  gMeme.lines[gCurrLineIdx].pos.x += dx;
  gMeme.lines[gCurrLineIdx].pos.y += dy;
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
    console.log('loneclicked');
    return true;
  } else {
    console.log('!!!loneclicked');
    return false;
  }
}

function setLineDrag(isDrag) {
  gMeme.lines[gCurrLineIdx].isDrag = isDrag;
}

function updateLineWidth(lineWidth, idx) {
  gMeme.lines[idx].lineWidth = lineWidth;
}

function changeLineFocus() {
  if (gMeme.lines.length <= 1) {
    gMeme.lines[gCurrLineIdx].isFocus = false;
    return;
  }
  gMeme.lines[gCurrLineIdx].isFocus = false;
  if (gCurrLineIdx - 1 < 0) {
    gCurrLineIdx = gMeme.lines.length - 1;
  } else {
    gCurrLineIdx--;
  }
  gMeme.lines[gCurrLineIdx].isFocus = true;
}

function changeFontSize(sign) {
  gMeme.lines[gCurrLineIdx].size += sign;
}

function updateMemeImg(imgId) {
  gMeme.selectedImgId = imgId;
}

function updateMemeTxt(txt) {
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
