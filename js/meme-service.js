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
      isFocus: false,
    },
  ],
};

function createTxtLine(txt = '') {
  const line = {
    txt,
    size: 20,
    align: 'left',
    color: 'red',
    isFocus: false,
  };
  gMeme.lines.push(line);
  gCurrLineIdx++;
}
function setLineOnFocus() {
  console.log('before', gCurrLineIdx, gMeme.lines[gCurrLineIdx]);
  gMeme.lines[gCurrLineIdx].isFocus = true;
  gCurrLineIdx = gCurrLineIdx === gMeme.lines.length - 1 ? 0 : gCurrLineIdx++;
  console.log('after', gCurrLineIdx, gMeme.lines[gCurrLineIdx]);
}

function unfocusLine() {
  gMeme.lines[gCurrLineIdx].isFocus = false;
  console.log('unfocused', gMeme.lines[gCurrLineIdx].isFocus);
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
