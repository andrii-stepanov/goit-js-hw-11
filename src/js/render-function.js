function renderGaleryImg(gallery) {
  return gallery
    .map(item => {
      return `<li class="gallery-item">
      <a href="${item.largeImageURL}" class="gallery-link">
        <img class="gallery-image" src="${item.webformatURL}" alt="${item.tags}" data-source="${item.tags}"
        data-title="${item.tags}"  height="255" width="430"/>
      </a> 
          <ul class="sublist">
        <li class="sublist-item">
            <p class="sublist-title">Likes</p>
            <p class="sublist-text">${item.likes}</p>
         </li>
        <li class="sublist-item">
            <p class="sublist-title">Viewes</p>
            <p class="sublist-text">${item.views}</p>
         </li>
         <li class="sublist-item">
            <p class="sublist-title">Comments</p>
            <p class="sublist-text">${item.comments}</p>
        </li>
         <li class="sublist-item">
            <p class="sublist-title">Download</p>
            <p class="sublist-text">${item.downloads}</p>
        </li>
    </ul>
      </li>`;
    })
    .join('');
}
export default renderGaleryImg;