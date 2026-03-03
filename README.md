# CineVox

CineVox is an AI-powered movie insight app. Enter an IMDb ID and get movie metadata from OMDb plus an AI-generated sentiment summary/classification powered by Groq.

## Features

- IMDb ID based movie lookup (`tt1234567` format).
- AI sentiment analysis with:
- `summary` (short audience response overview)
- `classification` (`positive`, `mixed`, or `negative`)
- Rich movie details:
- Title, year, plot, cast, genre, director, runtime, IMDb rating, poster.
- Responsive pages for:
- Home (`/`)
- Discover (`/discover`)
- About (`/about`)
- Dynamic movie details (`/movie/[id]`)
- Backend API route at `/api/movie?id=<imdbId>` for movie + sentiment response.
- Validation for invalid IMDb IDs with clear error handling (`400`, `404`, `500`).
- Caching strategy:
- OMDb fetch revalidation (`600s`)
- In-memory API cache with 10-minute TTL

## How It Works

1. User enters an IMDb ID in the UI.
2. App calls `/api/movie?id=<imdbId>`.
3. API validates ID format.
4. API checks cache, otherwise fetches movie metadata from OMDb.
5. API sends movie context to Groq model for sentiment generation.
6. API returns merged JSON response to render in the UI.

## API Response Shape

```json
{
  "imdbId": "tt0111161",
  "title": "The Shawshank Redemption",
  "year": "1994",
  "rating": "9.3",
  "poster": "https://...",
  "plot": "...",
  "cast": ["Tim Robbins", "Morgan Freeman"],
  "genre": "Drama",
  "director": "Frank Darabont",
  "runtime": "142 min",
  "sentiment": {
    "summary": "Audience reaction summary...",
    "classification": "positive"
  }
}
```

## Project Structure

```text
app/
  about/page.js
  discover/page.js
  movie/[id]/page.js
  api/movie/route.js
lib/
  omdb.js
  groq.js
  validation.js
components/
  MovieCard.jsx
  Navbar.jsx
  SearchBar.jsx
  SentimentPanel.jsx
  SkeletonLoader.jsx
```

## Setup Instructions

### 1. Prerequisites
- Node.js `20+` (recommended for Next.js 16)
- npm `10+`
- OMDb API key
- Groq API key

### 2. Clone and install
```bash
git clone https://github.com/itsyashbisht/CineVox.git
cd CineVox
npm install
```

### 3. Configure environment variables
Create `.env.local` in the project root:

```env
OMDB_API_KEY=your_omdb_api_key
GROQ_API_KEY=your_groq_api_key
```

### 4. Run the app
```bash
npm run dev
```

Open `http://localhost:3000`.

### 5. Useful scripts
- `npm run dev` - start local dev server
- `npm run build` - production build
- `npm run start` - run production build
- `npm run lint` - run ESLint

## Tech Stack Rationale

- **Next.js 16 (App Router)**: Enables clean route-based architecture (`/`, `/discover`, `/movie/[id]`, `/api/movie`) with server and client rendering support.
- **React 19**: Strong component model for interactive UI and state-driven flows.
- **Tailwind CSS v4**: Fast iteration on consistent, responsive styling for a modern product UI.
- **OMDb API**: Simple and reliable source for IMDb-keyed movie metadata.
- **Groq SDK (Llama model)**: Low-latency sentiment summarization/classification for near real-time analysis.
- **In-memory caching + Next fetch revalidation**: Reduces repeated API calls and improves response speed (10-minute TTL behavior in API/fetch layer).
- **ESLint**: Basic quality guardrails for maintainable code.

## Assumptions

- Users provide valid IMDb IDs in the format `tt` + `7-8` digits.
- API keys are available locally via `.env.local` and are not committed.
- This app targets demo/prototype scale and uses process-memory cache (not shared across multiple instances).
- Sentiment output is AI-generated guidance, not ground truth.
- External dependencies (OMDb/Groq) are available and within rate limits.
