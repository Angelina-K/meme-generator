'use strict';
let gStartPos;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];

function onSelectImg(imgId) {
  addResizeListener();
  let elCanvas = document.querySelector('.canvas');
  elCanvas.hideen = false;

  let elGallery = document.querySelector('.gallery-container');
  elGallery.style.display = 'none';
  document.querySelector('.meme-content').style.display = 'flex';
  updateMemeImg(imgId);
  resizeCanvas();
  changeCanvasContent();
}

function loadImgFromInput(ev, onImageReady) {
  addResizeListener();
  var reader = new FileReader();

  reader.onload = function (event) {
    var img = new Image();
    img.onload = onImageReady.bind(null, img);
    img.src = event.target.result;
    setImgFromInput(img.src);
  };
  reader.readAsDataURL(ev.target.files[0]);
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
  const meme = getCurrMeme();
  const currLineIdx = getCurrLineIdx();
  if (!meme.lines[currLineIdx].txt) return;
  createTxtLine();
  clearPlaceholder();
  changeCanvasContent();
}

function onRemoveLine() {
  removeLine();
  changeCanvasContent();
  clearPlaceholder();
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
  if (meme.lines && memeLine.isDrag) {
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
  loadImgFromInput(ev, renderImgFromInput);
}

function onShareImg() {
  uploadImg();
}

function onDownloadImg(elLink) {
  saveMeme();
  const canvas = getCanvas();
  var imgContent = canvas.toDataURL('image/jpeg');
  elLink.href = imgContent;
}

function onOpenSavedMems() {
  let elGallery = document.querySelector('.gallery-container');
  elGallery.style.display = 'none';
  document.querySelector('.meme-content').style.display = 'none';
  let elSavedMemes = document.querySelector('.saved-memes');
  elSavedMemes.style.display = 'flex';

  const memes = loadFromStorage('imgesDB');
  if (!memes) {
    let elMsg = document.querySelector('.saved-memes h3');
    elMsg.innerText = 'You dont have samed Memes';
    return;
  }

  const strHtml = memes.map((meme, idx) => {
    const strMeme = `<div class="saved-meme img" onclick="onSelectSaved(${idx})"><img src="data:image/png;base64,${meme}" alt=""></div>`;
    return strMeme;
  });
  elSavedMemes.innerHTML = strHtml.join('');
}

function onSelectSaved() {
  console.log('Sorry, view only...');
}

function onAlignText(side) {
  updateTxtSide(side);
  changeCanvasContent();
}
