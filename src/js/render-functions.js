import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export const toggleLoadingIndicator = isLoading => {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.classList.toggle('hidden', !isLoading);
  }
};

export const renderImages = images => {
  const gallery = document.querySelector('.gallery');

  if (!images) {
    iziToast.error({
      message: 'Please enter a search term!',
      position: 'topRight',
      timeout: 5000,
      transitionIn: 'fadeIn',
      transitionOut: 'fadeOut',
    });
    return;
  }

  if (images.length === 0) {
    iziToast.error({
      message: 'Sorry, no images match your search. Please try again!',
      position: 'topRight',
      timeout: 5000,
      transitionIn: 'fadeIn',
      transitionOut: 'fadeOut',
    });
    return;
  }

  gallery.innerHTML = '';

  const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    return `
      <li>
        <a href="${largeImageURL}" class="gallery-item">
          <img src="${webformatURL}" alt="${tags}" />
        </a>
        <div class="info">
          <div class="stat-item"><p class="label">Likes</p><p class="value">${likes}</p></div>
          <div class="stat-item"><p class="label">Views</p><p class="value">${views}</p></div>
          <div class="stat-item"><p class="label">Comments</p><p class="value">${comments}</p></div>
          <div class="stat-item"><p class="label">Downloads</p><p class="value">${downloads}</p></div>
        </div>
      </li>`;
  }).join('');

  gallery.insertAdjacentHTML('beforeend', markup);
};

export const handleSearch = () => {
  const searchInput = document.querySelector('.search-input').value.trim();
  if (!searchInput) {
    iziToast.error({
      message: 'Please enter a search term before submitting!',
      position: 'topRight',
      timeout: 5000,
      transitionIn: 'fadeIn',
      transitionOut: 'fadeOut',
    });
    return;
  }
};

export const fetchImages = async searchQuery => {
  try {
    toggleLoadingIndicator(true);
    const response = await fetch(`https://api.example.com/images?q=${searchQuery}`);
    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }
    const images = await response.json();
    renderImages(images);
  } catch (error) {
    iziToast.error({
      message: 'An error occurred while fetching images. Please try again later.',
      position: 'topRight',
      timeout: 5000,
      transitionIn: 'fadeIn',
      transitionOut: 'fadeOut',
    });
  } finally {
    toggleLoadingIndicator(false);
  }
};
