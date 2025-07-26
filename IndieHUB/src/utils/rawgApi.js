// API RAWG

export async function fetchManyIndieGames(total = 120) {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = import.meta.env.VITE_API_URL;
  const PAGE_SIZE = 40;

  const pages = Math.ceil(total / PAGE_SIZE);
  let games = [];

  for (let i = 1; i <= pages; i++) {
    const res = await fetch(
      `${BASE_URL}/games?key=${API_KEY}&genres=indie&page=${i}&page_size=${PAGE_SIZE}`
    );
    const data = await res.json();
    games = games.concat(data.results || []);
  }
  return games;
}