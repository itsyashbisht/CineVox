import { NextResponse } from 'next/server';
import { fetchMovie } from '@/lib/omdb';
import { analyzeSentiment } from '@/lib/groq';
import { validateImdbId } from '@/lib/validation';

// Simple in-memory cache
const cache = new Map();

export async function GET (request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id || !validateImdbId(id)) {
    return NextResponse.json({ error: 'Invalid IMDb ID format' }, { status: 400 });
  }
  
  // Check cache (10 min TTL)
  if (cache.has(id)) {
    const { data, timestamp } = cache.get(id);
    if (Date.now() - timestamp < 10 * 60 * 1000) {
      return NextResponse.json(data);
    }
  }
  
  try {
    const movie = await fetchMovie(id);
    const sentiment = await analyzeSentiment(movie.Title, movie.Plot, movie.Ratings);
    
    const response = {
      imdbId: id,
      title: movie.Title,
      year: movie.Year,
      rating: movie.imdbRating,
      poster: movie.Poster,
      plot: movie.Plot,
      cast: movie.Actors?.split(', ') || [],
      genre: movie.Genre,
      director: movie.Director,
      runtime: movie.Runtime,
      sentiment,
    };
    
    cache.set(id, { data: response, timestamp: Date.now() });
    return NextResponse.json(response);
    
  } catch (err) {
    if (err.message === 'Movie not found') {
      return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}