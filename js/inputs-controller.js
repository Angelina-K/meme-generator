'use strict';

function onSelectImg(imgId) {
  updateMemeImg(imgId);
  changeCanvasContent();
}

function onTypeTxt(txt) {
  updateMemeTxt(txt);
  // createTxtLine(txt);
  changeCanvasContent();
  // focusOnLine();
}

function onChangeFontSize(sign) {
  changeFontSize(sign);
  changeCanvasContent();
}
function onAddLine() {
  createTxtLine();
  // toggleLineFocus();
  clearPlaceholder();
  // unfocusLine();
  changeCanvasContent();
}
function onSelectLine() {
  changeLineFocus();
  changeCanvasContent();
  // if (meme.lines[getCurrLineIdx()].isFocus) {
  //   focusOnLine();
  // } else {
  //   changeCanvasContent();
  // }
}

// toggleLineFocus();
// const meme = getCurrMeme();
// if (meme.lines[getCurrLineIdx()].isFocus) {
//   focusOnLine();
// } else {
//   changeCanvasContent();
// }
// changeCanvasContent();

function clearPlaceholder() {
  let elPlaceHolder = document.querySelector('.text-input');
  elPlaceHolder.value = elPlaceHolder.ariaPlaceholder;
}
