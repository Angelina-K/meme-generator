'use strict';
let gStartPos;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];

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
  console.log('onDown');
  const pos = getEvPos(ev);
  if (!isLineClicked(pos)) return;
  setLineDrag(true);
  gStartPos = pos;
  document.body.style.cursor = 'grabbing';
  // console.log('grabbing');
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
