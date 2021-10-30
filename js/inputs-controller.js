'use strict';
let gStartPos;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];

function onSelectImg(imgId) {
  console.log('on select img');
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
  console.log('onDown');
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
  loadImgFromInput(ev, renderImgFromInput);
}

function onShareImg() {
  // saveMeme();
  // changeCanvasContent();
  uploadImg();
}

function onDownloadImg(elLink) {
  saveMeme();
  // changeCanvasContent();
  var imgContent = gElCanvas.toDataURL('image/jpeg');
  // var imgContent = gCtx.getImageData(0, 0, gElCanvas.width, gElCanvas.higth);
  elLink.href = imgContent;
}

function onOpenSavedMems() {
  let elGallery = document.querySelector('.gallery-container');
  elGallery.style.display = 'none';
  // main content display none
  let elSavedMemes = document.querySelector('.saved-memes');
  elSavedMemes.style.display = 'flex';

  const memes = loadFromStorage('imgesDB');

  const strHtml = memes.map((meme, idx) => {
    const strMeme = `<div class="saved-meme img" onclick="onSelectSaved(${idx})"><img src="data:image/png;base64,${meme}" alt=""></div>`;
    return strMeme;
  });
  elSavedMemes.innerHTML = strHtml.join('');
}
