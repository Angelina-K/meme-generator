'use strict';

function loadFromStorage(key) {
  console.log('from storage');
  const json = localStorage.getItem(key);
  const val = JSON.parse(json);
  return val;

  //   var dataURL = localStorage.getItem(gElCanvas);
  //   var img = new Image();
  //   img.src = dataURL;
  //   img.onload = function () {
  //     gCtx.drawImage(img, 0, 0);
  //   };
}

function saveCanvasToStorage() {
  //   const json = JSON.stringify(val);
  //   localStorage.setItem(key, json);
  localStorage.setItem(gElCanvas, gElCanvas.toDataURL());
}

function saveAsImgToStorage(key, val) {
  const json = JSON.stringify(val);
  localStorage.setItem(key, json);
}
