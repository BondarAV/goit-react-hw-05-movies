import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '1c8add71a3be57e9a544b27831043b57';

export async function trendingMovies() {
  return axios.get(
    `${BASE_URL}/trending/all/day?api_key=${API_KEY}&language=en-US`
  );
}

export async function searchMovies(query) {
  return axios.get(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}`
  );
}

export async function getMovieById(id) {
  return axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`);
}

export async function getMovieCredits(id) {
  return axios.get(
    `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
  );
}

export async function getMovieReviews(id) {
  return axios.get(
    `${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}&language=en-US`
  );
}
