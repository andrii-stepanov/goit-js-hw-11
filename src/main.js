import fetchImage from './js/pixabay-api.js';
import renderGaleryImg from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const parametersObject = {
  urlBase: 'https://pixabay.com/api/',
  apiKey: '48839660-7b8b283c3689698998fc631e5',
  searchExpression: null,
  type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};

class MessageAlert {
  constructor(title, message, position, timeout, transitionIn, transitionOut) {
    this.title = title;
    this.message = message;
    this.position = position;
    this.timeout = timeout;
    this.transitionIn = transitionIn;
    this.transitionOut = transitionOut;
  }
  error() {
    iziToast.error({
      title: this.title,
      message: this.message,
      position: this.position,
      timeout: this.timeout,
      transitionIn: this.transitionIn,
      transitionOut: this.transitionOut,
    });
  }
  info() {
    iziToast.info({
      title: this.title,
      message: this.message,
      position: this.position,
      timeout: this.timeout,
      transitionIn: this.transitionIn,
      transitionOut: this.transitionOut,
    });
  }
}
class ErrorAlert extends MessageAlert {
  constructor(message) {
    super('Error', message, 'topRight', 5000, 'fadeInDown', 'fadeOutUp');
  }
}
class InfoAlert extends MessageAlert {
  constructor(message) {
    super('info', message, 'topRight', 5000, 'blue', 'fadeInDown', 'fadeOutUp');
  }
}
const errorAlertInstance = new ErrorAlert(
  'Sorry, there are no images matching your search query. Please try again!'
);

const imgList = document.querySelector('.gallery');
const searchForm = document.querySelector('.form');
const loader = document.querySelector('.loader');

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  const searchExpression = searchInputExpretion();
  if (!searchExpression) {
    return;
  }
  parametersObject.searchExpression = searchExpression;
  loader.style.display = 'inline-block';
  fetchImage(parametersObject)
    .then(gallery => {
      if (gallery.hits.length === 0) {
        errorAlertInstance.error();
      }
      imgList.innerHTML = renderGaleryImg(gallery.hits);
      const galleryInner = new SimpleLightbox('.gallery a', {
        captions: true,
        captionsData: 'alt',
        captionDelay: 250,
        animationSpeed: 300,
        animationSlide: true,
        overlay: true,
        overlayOpacity: 0.8,
      });
      galleryInner.on('shown.simplelightbox', () => {
        const lightboxContainer = document.querySelector('.simple-lightbox');
        if (!lightboxContainer) return;
      });
      galleryInner.refresh();
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      loader.style.display = 'none';
    });
  searchForm.reset();
});

function searchInputExpretion() {
  const searchInput = document.querySelector('.js-form-input');
  const searchData = searchInput.value.replace(/\d+/g, '').replace(/ /g, '+');

  if (searchData === '') {
    const InfoAlertInstans = new InfoAlert('Please enter a search term');
    InfoAlertInstans.info();
    return;
  }
  return searchData;
}