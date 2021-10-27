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
    },
  ],
};

function createTxtLine(txt = '') {
  const line = {
    txt,
    size: 20,
    align: 'left',
    color: 'red',
  };
  gMeme.lines.push(line);
  gCurrLineIdx++;
}
function changeFontSize(sign) {
  gMeme.lines[gCurrLineIdx].size += sign;
}
function updateMemeImg(imgId) {
  gMeme.selectedImgId = imgId;
  console.log('gMeme.selectedImgId', gMeme.selectedImgId);
}

function updateMemeTxt(txt) {
  // gMeme.lines[0].txt = txt;
  gMeme.lines[gCurrLineIdx].txt = txt;
  console.log('gCurrLineIdx', gCurrLineIdx, gMeme.lines[gCurrLineIdx]);
}
// function addNewLine(){
//   gCurrLineIdx++
// }

function getCurrLine() {
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
