'use strict';

function onSelectImg(imgId) {
  updateMemeImg(imgId);
  changeCanvasContent();
}

function onTypeTxt(txt) {
  updateMemeTxt(txt);
  changeCanvasContent();
}

function onChangeFontSize(sign) {
  changeFontSize(sign);
  changeCanvasContent();
}
