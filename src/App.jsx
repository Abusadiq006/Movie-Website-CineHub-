import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import { Routes, Route, Link } from 'react-router-dom'
import Search from './components/Search.jsx'
import MovieCard from './components/MovieCard.jsx'
import Spinner from './components/Spinner.jsx'
import { useDebounce } from 'react-use'
import MovieDetails from './components/MovieDetails.jsx'

import Trending from './pages/Trending.jsx'
import About from './pages/About.jsx'

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY

const Home = () => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [movieList, setMovieList] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])

  const fetchMovies = async (query = '') => {
    setIsLoading(true)
    setErrorMessage('')

    try {
      const endpoint = query
        ? `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`
        : `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}`

      const response = await fetch(endpoint)
      if (!response.ok) throw new Error('Failed to fetch movies')

      const data = await response.json()
      if (!data.results || data.results.length === 0) {
        setErrorMessage('No movies found.')
        setMovieList([])
        return
      }

      setMovieList(data.results)
    } catch (error) {
      console.error('Error fetching movies:', error)
      setErrorMessage('Error fetching movies. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm)
  }, [debouncedSearchTerm])

  return (
    <main className="min-h-screen bg-dark-900 text-white relative">
      <Header />
      
      <div className="pattern" />
      <div className="wrapper">
        <header className="text-center">
          <img src="/hero.png" alt="Hero Banner" className="mx-auto mb-5" />
          <h1 className="text-3xl sm:text-5xl font-bold">
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            <br /> Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className="all-movies mt-10">
          <h2>All Movies</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500 mt-6">{errorMessage}</p>
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
        </section>
      </div>
    </main>
  )
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/trending" element={<Trending />}/>
      <Route path="/about" element={<About />}/>
      <Route path="*" element={<h2 className='text-center text-gray-400 mt-10'>404 - Page Not Found</h2>} />
    </Routes>
    
  )
}

export default App
