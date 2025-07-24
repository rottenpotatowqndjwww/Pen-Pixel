import React from 'react'
import nav_logo from '../assets/nav_logo.webp'
import { assets } from '../assets/assets.js'
import { useNavigate, Link,useLocation } from 'react-router-dom'
import { useAppContext } from '../context/appContext.jsx'


const Navbar = () => {
  const navigate = useNavigate();
  const location  = useLocation();
    if(location.pathname.startsWith('/admin')){
    return null;
  }

  const {isAdmin} = useAppContext();

  return (
    <nav className="sticky top-0 z-50 bg-white/98 backdrop-blur-sm shadow-sm border-b border-gray-100 w-full">
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32">
        <div className="flex items-center justify-between py-4 max-w-7xl mx-auto">
          
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <img 
            onClick={()=>navigate('/')}
              src={nav_logo}
              alt="Quickblog logo"
              className="w-28 sm:w-36 md:w-40 lg:w-44 hover:scale-[1.02] transition-transform duration-300 ease-out cursor-pointer"
            />
          </div>

          {/* Navigation - Centered */}
          <div className="flex-grow flex justify-center">
              <div className="hidden sm:flex items-center space-x-8 lg:space-x-10">
    
    <Link
      to="/"
      className="text-gray-700 hover:text-primary font-medium transition-colors duration-300 ease-out relative group capitalize"
    >
      Home
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 ease-out group-hover:w-full rounded-full"></span>
    </Link>

    <Link
      to="/gotoblog"
      className="text-gray-700 hover:text-primary font-medium transition-colors duration-300 ease-out relative group capitalize"
    >
      Blog
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 ease-out group-hover:w-full rounded-full"></span>
    </Link>

    <Link
      to="/about"
      className="text-gray-700 hover:text-primary font-medium transition-colors duration-300 ease-out relative group capitalize"
    >
      About
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 ease-out group-hover:w-full rounded-full"></span>
    </Link>

  </div>
            {/* Mobile Home Link */}
            <div className="sm:hidden">
              <a href="#home" className="text-gray-700 hover:text-primary font-medium transition-colors duration-300 ease-out relative group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 ease-out group-hover:w-full rounded-full"></span>
              </a>
            </div>
          </div>

          {/* Login Button Section */}
          <div className="flex-shrink-0">
            <button
            onClick={()=> navigate('/admin')}
             className="group flex items-center space-x-2 bg-primary hover:bg-primary/95 text-white px-4 py-2 sm:px-6 sm:py-2.5 rounded-xl font-semibold transition-all duration-300 ease-out hover:shadow-lg hover:shadow-primary/25 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2">
              <span className="text-sm sm:text-base">{ isAdmin ? "Go To Dashboard" : "Login"}</span>
              <img 
                src={assets.arrow}
                alt="arrow"
                className="w-3 sm:w-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
              />
            </button>
          </div>

        </div>
      </div>
    </nav>
  )
}

export default Navbar
