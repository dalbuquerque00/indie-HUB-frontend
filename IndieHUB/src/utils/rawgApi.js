// src/utils/rawgApi.js
const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchIndieGames(page = 1, pageSize = 20) {
  const response = await fetch(
    `${BASE_URL}/games?key=${API_KEY}&genres=indie&ordering=-rating&page=${page}&page_size=${pageSize}`
  );
  if (!response.ok) throw new Error("Erro ao buscar jogos");
  return response.json();
}