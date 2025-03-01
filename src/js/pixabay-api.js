import axios from 'axios';

async function fetchImage({
  urlBase,
  apiKey,
  searchExpression,
  type,
  orientation,
  safesearch,
}) {
  const response = await axios.get(urlBase, {
    params: {
      key: apiKey,
      q: searchExpression,
      image_type: type,
      orientation: orientation,
      safesearch: safesearch,
    },
  });
  return response.data;
}

export default fetchImage;