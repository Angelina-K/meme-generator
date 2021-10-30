'use strict';

function loadFromStorage(key) {
  const json = localStorage.getItem(key);
  const val = JSON.parse(json);
  return val;
}

function saveCanvasToStorage() {
  localStorage.setItem(gElCanvas, gElCanvas.toDataURL());
}

function saveAsImgToStorage(key, val) {
  const json = JSON.stringify(val);
  localStorage.setItem(key, json);
}
