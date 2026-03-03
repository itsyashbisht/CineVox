export async function fetchMovie(imdbId) {
  const res = await fetch(
    `https://www.omdbapi.com/?i=${imdbId}&apikey=${process.env.OMDB_API_KEY}`,
    {
      next: {
        revalidate: 600,
      },
    }, // cache 10 mins
  );
  const data = await res.json();
  if (data.Response === "False")
    throw new Error(data?.Error || "Movie not found");
  return data;
}

export async function fetchPopularMovies() {
  const IDS = [
    "tt0111161", // The Shawshank Redemption
    "tt0068646", // The Godfather
    "tt0468569", // The Dark Knight
    "tt1375666", // Inception
    "tt0816692", // Interstellar
    "tt0109830", // Forrest Gump
    "tt0137523", // Fight Club
    "tt0167260", // The Lord of the Rings: The Return of the King
    "tt0245429", // Spirited Away
    "tt6751668", // Parasite
  ];

  const results = await Promise.allSettled(IDS.map((id) => fetchMovie(id)));

  return results
    .filter((r) => r.status === "fulfilled" && r.value)
    .map((r) => r.value);
}
