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
      txt: '',
      size: 20,
      align: 'left',
      color: 'red',
      isFocus: true,
      lineWidth: 0,
    },
  ],
};

function createTxtLine(txt = '') {
  gMeme.lines[gCurrLineIdx].isFocus = false;

  const line = {
    txt,
    size: 20,
    align: 'left',
    color: 'red',
    isFocus: true,
    lineWidth: 0,
  };
  gMeme.lines.push(line);
  gCurrLineIdx++;
  // console.log('afret createline', gCurrLineIdx);
}

function updateLineWidth(lineWidth, idx) {
  gMeme.lines[idx].lineWidth = lineWidth;
  // console.log('gMeme', gMeme.lines[gCurrLineIdx]);
}

// function checkFocusStatus(){
//   let isFocus=gMeme.lines[gCurrLineIdx].isFocus
//   if (!isFocus){
//     isFocus=true
//     return true
//   }else{
//     isFocus=false

//   }

// function toggleLineFocus() {
//   // console.log('toggle func',gCurrLineIdx,gMeme.lines[gCurrLineIdx].isFocus);
//   gMeme.lines[gCurrLineIdx].isFocus = !gMeme.lines[gCurrLineIdx].isFocus;
//   console.log('toggle func', gMeme.lines);
// }
// if (!gMeme.lines[gCurrLineIdx].isFocus) {
//   gCurrLineIdx =
//     gCurrLineIdx + 1 > gMeme.lines.length - 1 ? 0 : gCurrLineIdx++;
//   // gCurrLineIdx++;
//   gMeme.lines[gCurrLineIdx].isFocus = !gMeme.lines[gCurrLineIdx].isFocus;
// }
// console.log('gCurrLineIdx', gCurrLineIdx);
// console.log(gCurrLineIdx, 'isFocus', gMeme.lines[gCurrLineIdx].isFocus);

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
