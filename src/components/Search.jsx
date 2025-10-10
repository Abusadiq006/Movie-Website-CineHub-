import React from 'react'

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex items-center justify-center mt-8">
      <div className="flex items-center bg-dark-800 rounded-full px-4 py-2 shadow-md w-full max-w-md border border-gray-700 focus-within:border-gray-400 transition">
        <img
          src="/search.svg"
          alt="search icon"
          className="w-5 h-5 opacity-70 mr-3"
        />
        <input
          type="text"
          placeholder="Search thousands of movies..."
          aria-label="Search Movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent w-full text-white placeholder-gray-400 focus:outline-none"
        />
      </div>
    </div>
  )
}

export default Search
