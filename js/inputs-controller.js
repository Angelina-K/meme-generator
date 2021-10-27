'use strict';

function onSelectImg(imgId) {
  updateMemeImg(imgId);
  changeCanvasContent();
}

function onTypeTxt(txt) {
  updateMemeTxt(txt);
  // createTxtLine(txt);
  changeCanvasContent();
}

function onChangeFontSize(sign) {
  changeFontSize(sign);
  changeCanvasContent();
}
function onAddLine() {
  console.log('onAddLine');
  let elPlaceHolder = document.querySelector('.text-input');
  elPlaceHolder.value = elPlaceHolder.ariaPlaceholder;
  createTxtLine();
}
function onSelectText() {
  console.log('onSelectText');
}
