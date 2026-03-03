export async function fetchMovie (imdbId) {
  const res = await fetch(
    `https://www.omdbapi.com/?i=${imdbId}&apikey=${process.env.OMDB_API_KEY}`,
    {
      next:
        {
          revalidate: 600
        }
    }  // cache 10 mins
  );
  const data = await res.json();
  if (data.Response === 'False')
    throw new Error(
      data?.Error
      ||
      'Movie not found'
    );
  return data;
}

export async function fetchPopularMovies () {
  const ids = ['tt0111161', 'tt0068646', 'tt0468569', 'tt1375666'];
  const results = await Promise.all(ids.map(id => fetchMovie(id).catch(() => null)));
  return results.filter(Boolean);
}