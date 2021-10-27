'use strict';

function onSelectImg(imgId) {
  updateMemeImg(imgId);
  //   changeCanvasContent();
  drawImg(imgId);
}

function onTypeTxt(txt) {
  updateMemeTxt(txt);
  changeCanvasContent();
}
