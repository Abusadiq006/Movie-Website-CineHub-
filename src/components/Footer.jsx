import React from 'react'
import { Github, Twitter, Mail } from 'lucide-react'


const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center text-gray-400">
        
        {/* Left section */}
        <p className="text-sm text-center md:text-left">
          © {new Date().getFullYear()} <span className="text-pink-400 font-semibold">CineHub</span>. 
          Built with ❤️ by <span className="text-white font-medium">Farmer Abusadiq</span>
        </p>

        {/* Social icons */}
        <div className="flex gap-5 mt-4 md:mt-0">
          <a href="https://github.com/Abusadiq006" target="_blank" className="hover:text-pink-400 transition">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://x.com/sadiqmaitashi?s=11" target="_blank" className="hover:text-pink-400 transition">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="mailto:abusadiq006@gmail.com" className="hover:text-pink-400 transition">
            <Mail className="w-5 h-5 pointer-events-none" />
            
          </a>
          📬 Contact

          For inquiries, feedback, or collaboration, feel free to reach out:
          📧 abusadiq006@gmail.com
        </div>
      </div>
    </footer>
  )
}

export default Footer
