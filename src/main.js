import iziToast from 'izitoast';
import { getImages } from './js/pixabay-api';
import { createGalleryMarkup, createLightBox } from './js/render-functions';

const elements = {
  searchForm: document.querySelector('.form'),
  imageGallery: document.querySelector('.gallery'),
  loaderBackdrop: document.querySelector('.backdrop'),
};

const displayLoader = () =>
  elements.loaderBackdrop.classList.remove('is-hidden');
const removeLoader = () => elements.loaderBackdrop.classList.add('is-hidden');

const showErrorToast = message => {
  iziToast.error({
    messageColor: '#fff',
    backgroundColor: '#ef4040',
    position: 'topRight',
    message,
    timeout: 5000,
  });
};

const handleSearchSubmit = event => {
  event.preventDefault();
  const searchQuery = event.currentTarget.elements['search-text'].value.trim();

  if (searchQuery === '') {
    showErrorToast('Please enter a search query!');
    return;
  }

  displayLoader();
  elements.imageGallery.innerHTML = '';

  getImages(searchQuery)
    .then(({ hits }) => {
      if (!hits.length) {
        iziToast.error({
          messageColor: '#fff',
          close: false,
          backgroundColor: '#ef4040',
          position: 'topRight',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          timeout: 10000,
        });
        return;
      }

      const galleryMarkup = hits.map(createGalleryMarkup).join('');
      elements.imageGallery.innerHTML = galleryMarkup;
      createLightBox();
      elements.searchForm.reset();
    })
    .catch(error => {
      iziToast.error({
        messageColor: '#fff',
        backgroundColor: '#ef4040',
        position: 'topRight',
        message: `Oops! ${
          error.message || 'Something went wrong. Please try again later.'
        }`,
        timeout: 10000,
      });
    })
    .finally(() => {
      removeLoader();
    });
};

elements.searchForm.addEventListener('submit', handleSearchSubmit);
