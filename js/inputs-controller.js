'use strict';
let gStartPos;
let gStickerStartPos;
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
  let elGallery = document.querySelector('.gallery-container');
  elGallery.style.display = 'none';
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
  const isLine = isLineClicked(pos);
  const isSticker = isStickerClicked(pos);
  console.log(isSticker);
  console.log('returned');
  if (!isLine && !isSticker) return;
  if (isLine) {
    console.log('is line');
    setLineDrag(true);
    gStartPos = pos;
  }
  if (isSticker) {
    console.log('setting line drag');
    setStickerDrag(true);
    gStickerStartPos = pos;
  }
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

  if (meme.stickers.length && meme.stickers[gCurrSticker].isDrag) {
    const pos = getEvPos(ev);
    const dx = pos.x - gStickerStartPos.x;
    const dy = pos.y - gStickerStartPos.y;
    gStickerStartPos = pos;
    moveSticker(dx, dy);
    changeCanvasContent();
  }
}

function onUp() {
  setLineDrag(false);
  if (gMeme.stickers.length && gMeme.stickers[gCurrSticker].isDrag)
    setStickerDrag(false);
  document.body.style.cursor = 'auto';
}

function onImgInput(ev) {
  loadImgFromInput(ev, renderImgFromInput);
}

function onShareImg() {
  uploadImg();
}

// function onDownloadImg(elLink) {
//   // const meme = getCurrMeme();
//   // console.log(meme.isForSave);
//   // if (meme.isForSave) {
//   const canvas = getCanvas();
//   var imgContent = canvas.toDataURL('image/jpeg');
//   elLink.href = imgContent;
//   // }
// }

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
  console.log('fix');
  // updateTxtSide(side);
  // changeCanvasContent();
}

function onSaveMeme() {
  let elDownloadBtn = document.querySelector('.download-btn');
  elDownloadBtn.setAttribute('download', 'my-meme.jpg');
  elDownloadBtn.addEventListener('click', function onDownloadImg(event) {
    const canvas = getCanvas();
    var imgContent = canvas.toDataURL('image/png');
    event.href = imgContent;
  });
  renderBtns();
  saveMeme();
}

function renderBtns() {
  let elDownloadBtn = document.querySelector('.download-btn');
  elDownloadBtn.style.background = '#ff7f00';
  elDownloadBtn.style.cursor = 'pointer';

  let elShareBtn = document.querySelector('.share-btn');
  elShareBtn.style.background = '#ff7f00';
  elShareBtn.style.cursor = 'pointer';
}

function onFilterGallery(value) {
  const filterBy = value.innerText.toLowerCase();
  setFilterBy(filterBy);
  renderGallery(filterBy);
  // let str = (value.style.fontSize = 16 + 'px');
  // let fontSize = parseInt(str.slice(0, 2));
  value.style.fontSize = 20 + 'px';
}

function onOpenGallery() {
  let elSavedMemes = document.querySelector('.saved-memes');
  elSavedMemes.style.display = 'none';
  document.querySelector('.meme-content').style.display = 'none';
  let elGallery = document.querySelector('.gallery-container');
  elGallery.style.display = 'flex';
}

function onChangeColor(input, colorType) {
  console.log(input);
  changeTxtColor(input, colorType);
  changeCanvasContent();
}

function onChangeFont(font) {
  console.log('changing font to', font);
  changeFont(font);
  changeCanvasContent();
}

function onAddSticker(stickeriD) {
  const stickerPos = getCenterPos();
  console.log(stickerPos);
  addSticker(stickeriD, stickerPos);
  changeCanvasContent();
}
