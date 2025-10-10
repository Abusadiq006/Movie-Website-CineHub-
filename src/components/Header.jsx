import React from 'react'
import { Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import CineHubLogo from '../assets/CineHub.jpg'

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 w-full z-[100] backdrop-blur-md bg-black/40 border-b border-white/10 m-0 p-0">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* ✅ Logo Section */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={CineHubLogo}
            alt="CineHub Logo"
            className="w-10 h-10 object-cover rounded-md"
          />
          <span className="text-xl font-semibold tracking-wide text-white">
            Cine<span className="text-purple-300">Hub</span>
          </span>
        </Link>

        {/* ✅ Nav Links */}
        <nav className="hidden md:flex gap-8 text-sm text-gray-300 font-medium">
          <Link to="/" className="hover:text-pink-400 transition">Home</Link>
          <Link to="/trending" className="hover:text-pink-400 transition">Trending</Link>
          <Link to="/about" className="hover:text-pink-400 transition">About</Link>
        </nav>

        {/* ✅ Search Icon */}
        <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition">
          <Search className="w-5 h-5 text-white" />
        </button>
      </div>
    </header>
  )
}

export default Header
