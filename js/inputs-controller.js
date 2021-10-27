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
  clearPlaceholder();
  unfocusLine();
  createTxtLine();
  changeCanvasContent();
}
function onSelectText() {
  setLineOnFocus();
  focusOnLine();
  changeCanvasContent();
}

function clearPlaceholder() {
  let elPlaceHolder = document.querySelector('.text-input');
  elPlaceHolder.value = elPlaceHolder.ariaPlaceholder;
}
