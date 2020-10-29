import pictures from './gallery-items.js';

const refs = {
  galleryEl: document.querySelector('.js-gallery'),
  imageEl: document.querySelector('.lightbox__image'),
  closeBtn: document.querySelector('[data-action = "close-lightbox"]'),
  overlayEl: document.querySelector('.lightbox__overlay'),
  modalEl: document.querySelector('.js-lightbox'),
  rightBtn: document.querySelector('[data-action = "next-img"]'),
  leftBtn: document.querySelector('[data-action = "prev-img"]'),
};

const picturesContainer = refs.galleryEl;
const photosMarkup = picturesGalleryMarkup(pictures);

picturesContainer.insertAdjacentHTML('beforeend', photosMarkup);

picturesContainer.addEventListener('click', onPicturesClick);
refs.modalEl.addEventListener('click', onBtnCloseClick);

refs.overlayEl.addEventListener('click', onOverlayClick);

function picturesGalleryMarkup(pictures) {
  return pictures
    .map(({ preview, original, description }) => {
      return ` <li class="gallery__item">
      <a
        class="gallery__link"
        href="${original}"
      >
        <img
          class="gallery__image"
          src= "${preview}" 
          data-source="${original}"
          alt="${description}"
          
        />
      </a>
    </li>`;
    })
    .join('');
}
console.log(picturesGalleryMarkup);

function onPicturesClick(event) {
  event.preventDefault();
  document.addEventListener('keydown', onEscKeyBtnPress);

  refs.leftBtn.addEventListener('click', onLeftBtnClick);
  refs.rightBtn.addEventListener('click', onRightBtnClick);

  if (event.target.nodeName !== 'IMG') {
    return;
  }
  refs.imageEl.src = event.target.dataset.source;
  refs.imageEl.alt = event.target.alt;
  refs.modalEl.classList.add('is-open');
}

function onBtnCloseClick() {
  document.removeEventListener('keydown', onEscKeyBtnPress);

  refs.modalEl.classList.remove('is-open');
  refs.imageEl.src = '';
}

function onOverlayClick(event) {
  if (event.currentTarget === event.target) {
    onBtnCloseClick();
  }
}

function onEscKeyBtnPress(event) {
  console.log('Клик Esc');
  if (event.code === 'Escape') {
    onBtnCloseClick();
  }
}

let currentIndex = 0;

setActivePicture(currentIndex);

function onLeftBtnClick() {
  if (currentIndex - 1 < 0) {
    return;
  }

  currentIndex -= 1;
  setActivePicture(currentIndex);
  console.log('left click');
}

function onRightBtnClick() {
  if (currentIndex + 1 >= pictures.length) {
    return;
  }

  currentIndex += 1;
  setActivePicture(currentIndex);
  console.log('right click');
}

function setActivePicture(pictureCurrentIndex) {
  const activePicture = pictures[pictureCurrentIndex];
  refs.imageEl.src = activePicture;
}
