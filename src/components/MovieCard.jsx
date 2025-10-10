import React from 'react'
import { Link } from 'react-router-dom'

const MovieCard = ({ movie }) => {
  const { id, title, vote_average, poster_path, release_date, original_language } = movie

  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : '/no-movie.png'

  return (
    <Link to={`/movie/${id}`} className="block hover:scale-105 transition-transform duration-200">
      <div className="movie-card cursor-pointer">
        <img src={imageUrl} alt={title} className="rounded-lg w-full" />

        <div className="mt-4">
          <h3 className="text-lg font-semibold text-center">{title}</h3>

          <div className="flex justify-center items-center gap-2 text-gray-400 text-sm mt-1">
            <div className="rating flex items-center gap-1">
              <img src="/star.svg" alt="Star Icon" className="w-4 h-4" />
              <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
            </div>

            <span>•</span>
            <p>{original_language?.toUpperCase()}</p>

            <span>•</span>
            <p>{release_date ? release_date.split('-')[0] : 'N/A'}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default MovieCard
