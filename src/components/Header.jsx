import React from 'react'
import { Film, Search } from 'lucide-react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 w-full z-[100] backdrop-blur-md bg-black/40 border-b border-white/10 m-0">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Film className="w-6 h-6 text-pink-500" />
          <span className="text-xl font-semibold tracking-wide text-white">
            Cine<span className="text-gradient">Hub</span>
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex gap-8 text-sm text-gray-300 font-medium">
          <Link to="/" className="hover:text-pink-400 transition">Home</Link>
          <Link to="/trending" className="hover:text-pink-400 transition">Trending</Link>
          <Link to="/about" className="hover:text-pink-400 transition">About</Link>
        </nav>

        {/* Search Icon */}
        <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition">
          <Search className="w-5 h-5 text-white" />
        </button>
      </div>
    </header>
  )
}

export default Header
