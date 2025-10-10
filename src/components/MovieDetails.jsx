import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react' // cool minimalist icon
import { motion } from 'framer-motion'

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY

const MovieDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`
        )
        if (!res.ok) throw new Error('Failed to fetch movie details')

        const data = await res.json()
        setMovie(data)
      } catch (err) {
        console.error(err)
        setError('Error fetching movie details.')
      } finally {
        setLoading(false)
      }
    }

    fetchMovieDetails()
  }, [id])

  if (loading)
    return <p className="text-center mt-10 text-gray-400">Loading movie details...</p>
  if (error)
    return <p className="text-center mt-10 text-red-500">{error}</p>
  if (!movie) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 text-white p-6 relative overflow-hidden">
      {/* Floating back button */}
      <motion.button
        onClick={() => navigate(-1)}
        className="fixed top-6 left-6 z-50 bg-white/10 backdrop-blur-md p-3 rounded-full shadow-lg border border-white/20 hover:bg-white/20 transition"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft className="w-6 h-6 text-white" />
      </motion.button>

      <div className="flex flex-col md:flex-row gap-10 mt-16 max-w-6xl mx-auto">
        <motion.img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-2xl shadow-2xl w-full md:w-1/3 border border-white/10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />

        <motion.div
          className="flex-1 space-y-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-2 text-gradient">
            {movie.title}
          </h1>
          <p className="text-gray-300 leading-relaxed">{movie.overview}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 text-gray-300">
            <p><span className="font-semibold text-white">Release Date:</span> {movie.release_date}</p>
            <p><span className="font-semibold text-white">Rating:</span> ⭐ {movie.vote_average?.toFixed(1)} / 10</p>
            <p><span className="font-semibold text-white">Language:</span> {movie.original_language?.toUpperCase()}</p>
            <p><span className="font-semibold text-white">Runtime:</span> {movie.runtime} min</p>
            <p className="sm:col-span-2">
              <span className="font-semibold text-white">Genres:</span>{' '}
              {movie.genres?.map((g) => g.name).join(', ')}
            </p>
          </div>

          {/* Add a nice divider */}
          <div className="h-px bg-white/10 my-6" />

          {/* CTA button */}
          <motion.button
            onClick={() =>
              window.open(`https://www.themoviedb.org/movie/${id}`, '_blank')
            }
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 font-semibold shadow-md hover:shadow-lg hover:scale-105 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View on TMDB
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

export default MovieDetails
