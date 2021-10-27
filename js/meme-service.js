'use strict';
// let gKeywords = {'happy': 12,'funny puk': 1}
let gMems = [];

let gImgs = [
  { id: 1, url: 'img/1.jpg', keywords: ['Lazy'] },
  { id: 2, url: 'img/2.jpg', keywords: ['Cute'] },
];

let gMeme = {
  selectedImgId: 1,
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
function updateMemeImg(imgId) {
  gMeme.selectedImgId = imgId;
  console.log('gMeme.selectedImgId', gMeme.selectedImgId);
}

function updateMemeTxt(txt) {
  // let meme= getCurrMeme()
  gMeme.lines[0].txt = txt;
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
