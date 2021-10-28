'use strict';
let gStartPos;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];

function onSelectImg(imgId) {
  let elGallery = document.querySelector('.image-gallery');
  elGallery.style.display = 'none';
  document.querySelector('.main-content').style.display = 'flex';
  updateMemeImg(imgId);
  renderCanvas();
  resizeCanvas();
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

function onAddLine() {
  createTxtLine();
  clearPlaceholder();
  changeCanvasContent();
}

function onSelectLine() {
  changeLineFocus();
  changeCanvasContent();
}

function clearPlaceholder() {
  let elPlaceHolder = document.querySelector('.text-input');
  elPlaceHolder.value = elPlaceHolder.ariaPlaceholder;
}

function getEvPos(ev) {
  var pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  };
  if (gTouchEvs.includes(ev.type)) {
    ev.preventDefault();
    ev = ev.changedTouches[0];
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    };
  }
  return pos;
}

function onDown(ev) {
  const pos = getEvPos(ev);
  if (!isLineClicked(pos)) return;
  setLineDrag(true);
  gStartPos = pos;
  document.body.style.cursor = 'grabbing';
}

function onMove(ev) {
  const idx = getCurrLineIdx();
  const meme = getCurrMeme();
  const memeLine = meme.lines[idx];
  if (memeLine.isDrag) {
    const pos = getEvPos(ev);
    const dx = pos.x - gStartPos.x;
    const dy = pos.y - gStartPos.y;
    gStartPos = pos;
    moveLine(dx, dy);
    changeCanvasContent();
  }
}

function onUp() {
  setLineDrag(false);
  document.body.style.cursor = 'auto';
}

function onImgInput(ev) {
  loadImageFromInput(ev, renderImg);
}

function loadImageFromInput(ev, onImageReady) {
  var reader = new FileReader();

  reader.onload = function (event) {
    var img = new Image();
    img.onload = onImageReady.bind(null, img);
    img.src = event.target.result;
    setImgFromInput(img.src);
  };
  reader.readAsDataURL(ev.target.files[0]);
}

function renderImg(img) {
  const ctx = getCtx();
  let elGallery = document.querySelector('.image-gallery');
  elGallery.style.display = 'none';
  document.querySelector('.main-content').style.display = 'flex';
  renderCanvas();
  resizeCanvas();
  const elCanvas = getCanvas();
  ctx.drawImage(img, 0, 0, elCanvas.width, elCanvas.height);
}
