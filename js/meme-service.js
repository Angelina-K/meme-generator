'use strict';
// let gKeywords = {'happy': 12,'funny puk': 1}
let gMems = [];
let gCurrLineIdx = 0;

let gImgs = [
  { id: 1, url: 'img/1.jpg', keywords: ['Lazy'] },
  { id: 2, url: 'img/2.jpg', keywords: ['Cute'] },
];

let gMeme = {
  selectedImgId: 0,
  selectedLineIdx: 0,
  lines: [
    {
      pos: 0,
      txt: '',
      size: 20,
      align: 'left',
      color: 'red',
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
    color: 'red',
    lineWidth: 0,
    isFocus: true,
    boxBoundaries: 0,
    isDrag: false,
  };
  gMeme.lines.push(line);
  gCurrLineIdx++;
  // console.log('afret createline', gCurrLineIdx);
}

function saveTextPos(txtPos) {
  gMeme.lines[gCurrLineIdx].pos = txtPos;
  console.log('gMeme.lines[gCurrLineIdx].pos', gMeme.lines[gCurrLineIdx].pos);
}

function saveBoxSize(idx, boxBoundaries) {
  gMeme.lines[idx].boxBoundaries = boxBoundaries;
  console.log(gMeme.lines[idx].boxBoundaries);
}

function moveLine(dx, dy) {
  gMeme.lines[gCurrLineIdx].pos.x += dx;
  gMeme.lines[gCurrLineIdx].pos.y += dy;
  console.log('gMeme.lines new pos', gMeme.lines);
}

function isLineClicked(clickedPos) {
  if (!gMeme.lines[gCurrLineIdx].isFocus) {
    console.log('isFocus:', false);
    return false;
  }
  const { boxBoundaries } = gMeme.lines[gCurrLineIdx];

  if (
    clickedPos.x >= boxBoundaries.x &&
    clickedPos.x <= boxBoundaries.xWidth &&
    clickedPos.y >= boxBoundaries.y &&
    clickedPos.y <= boxBoundaries.yHight
  ) {
    console.log('line clicked');
    return true;
  } else {
    console.log('no line clicked');
    return false;
  }
}

function setLineDrag(isDrag) {
  gMeme.lines[gCurrLineIdx].isDrag = isDrag;
}

function updateLineWidth(lineWidth, idx) {
  gMeme.lines[idx].lineWidth = lineWidth;
  // console.log('gMeme', gMeme.lines[gCurrLineIdx]);
}

function changeLineFocus() {
  if (gMeme.lines.length <= 1) {
    console.log('if (gMeme.lines.length <= 1)');
    gMeme.lines[gCurrLineIdx].isFocus = false;
    console.log('gCurrLineIdx', gCurrLineIdx);
    console.log('focus?', gMeme.lines[gCurrLineIdx].isFocus);
    return;
  }
  gMeme.lines[gCurrLineIdx].isFocus = false;
  // gCurrLineIdx--;
  // gCurrLineIdx = gCurrLineIdx < 0 ? gMeme.lines.length - 1 : gCurrLineIdx--;
  if (gCurrLineIdx - 1 < 0) {
    gCurrLineIdx = gMeme.lines.length - 1;
  } else {
    gCurrLineIdx--;
  }
  gMeme.lines[gCurrLineIdx].isFocus = true;
}

// function unfocusLine() {
//   gMeme.lines[gCurrLineIdx].isFocus = false;
//   console.log('unfocused', gMeme.lines[gCurrLineIdx].isFocus);
// }

function changeFontSize(sign) {
  gMeme.lines[gCurrLineIdx].size += sign;
}
function updateMemeImg(imgId) {
  gMeme.selectedImgId = imgId;
}

function updateMemeTxt(txt) {
  // gMeme.lines[0].txt = txt;
  gMeme.lines[gCurrLineIdx].txt = txt;
  // console.log('gCurrLineIdx', gCurrLineIdx, gMeme.lines[gCurrLineIdx]);
}
// function addNewLine(){
//   gCurrLineIdx++
// }

function getCurrLineIdx() {
  return gCurrLineIdx;
}
function getCurrMeme() {
  return gMeme;
}
function getAllImgs() {
  return gImgs;
}

function createMeme() {
  console.log('k');
  // called when user selects photo
}
function renderAllImg() {
  console.log('k');
  // loop all img nums and push to ass
}
