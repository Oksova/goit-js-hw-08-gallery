import pictures from './gallery-items.js';

const refs = {
  galleryEl: document.querySelector('.js-gallery'),
  imageEl: document.querySelector('.lightbox__image'),
  closeBtn: document.querySelector('[data-action = "close-lightbox"]'),
  overlayEl: document.querySelector('.lightbox__overlay'),
  modalEl: document.querySelector('.js-lightbox'),
};

const picturesContainer = refs.galleryEl;
const photosMarkup = picturesGalleryMarkup(pictures);

picturesContainer.insertAdjacentHTML('beforeend', photosMarkup);

picturesContainer.addEventListener('click', onPicturesClick);
refs.modalEl.addEventListener('click', onBtnCloseClick);

refs.overlayEl.addEventListener('click', onOverlayClick);
document.addEventListener('keydown', onBtnClickScroll);

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
  console.log('Клик по картинке');
  event.preventDefault();
  document.addEventListener('keydown', onEscKeyBtnPress);

  if (event.target.nodeName !== 'IMG') {
    return;
  }
  refs.imageEl.src = event.target.dataset.source;
  refs.imageEl.alt = event.target.alt;
  refs.modalEl.classList.add('is-open');
}

function onBtnCloseClick() {
  console.log('Клик для закрытия картинки');
  document.removeEventListener('keydown', onEscKeyBtnPress);

  refs.modalEl.classList.remove('is-open');
  refs.imageEl.src = '';
}

function onOverlayClick(event) {
  console.log('Клик overlay');
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
