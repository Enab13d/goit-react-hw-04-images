import axios from "axios";

export const fetchImages = async (searchQuery, page, itemsPerPage) => {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '36260632-728371171460318eb48af8b20';
    const params = new URLSearchParams({
      key: API_KEY,
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: itemsPerPage,
    });
      const response = await axios.get(`${BASE_URL}?${params}`);
      return response;
  };