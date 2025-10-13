import { useEffect, useState } from "react"
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"
import MovieCard from "../components/MovieCard.jsx"
import Spinner from "../components/Spinner.jsx"
import { Link } from "react-router-dom"
const Trending = () => {
  const [movieList, setMovieList] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const fetchTrendingMovies = async () => {
    setIsLoading(true)
    setErrorMessage('')

    try {
      const endpoint = `https://api.themoviedb.org/3/trending/movie/day?api_key=${TMDB_API_KEY}`
      const response = await fetch(endpoint)
      if (!response.ok) throw new Error('Failed to fetch trending movies')

      const data = await response.json()
      if (!data.results || data.results.length === 0) {
        setErrorMessage('No trending movies found.')
        setMovieList([])
        return
      }

      setMovieList(data.results)
    } catch (error) {
      console.error('Error fetching trending movies:', error)
      setErrorMessage('Error fetching trending movies. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTrendingMovies()
  }, [])

  return (
    <main className="min-h-screen bg-dark-900 text-white relative">
      <Header />
      <div className="pattern" />

      <div className="wrapper mt-10">
        <h1 className="text-3xl font-bold text-center mb-6">🔥 Trending Movies</h1>

        {isLoading ? (
          <Spinner />
        ) : errorMessage ? (
          <p className="text-red-500 text-center mt-6">{errorMessage}</p>
        ) : (
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {movieList.map((movie) => (
              <li key={movie.id}>
                <Link to={`/movie/${movie.id}`}>
                  <MovieCard movie={movie} />
                </Link>
              </li>
            ))}
          </ul>
        )}
        <Footer />
      </div>
    </main>
  )
}

export default Trending
