import React from "react";
import { Link, useLocation } from "react-router-dom";


const Footer = () => {
    const location = useLocation();

  if(location.pathname.startsWith('/admin')){
    return null;
  }

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 bg-white animate-in slide-in-from-bottom-8 duration-500">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
        <div className="animate-in slide-in-from-left-6 duration-700 delay-200">
          <div className="w-34 md:w-32 h-16 bg-gray-900/20 rounded-lg flex items-center justify-center hover:scale-105 transition-transform duration-300 ease-out">
            <span className="text-gray-900 font-bold text-lg">Pen Pixel</span>
          </div>
          <p className="max-w-[410px] mt-6 animate-in fade-in duration-700 delay-300">
            Pen Pixel is your daily dose of thoughts, stories, and insights. From tech to travel, we bring blogs that inspire, inform, and ignite curiosity.
          </p>
        </div>

        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
          {/* Quick Links */}
          <div className="animate-in slide-in-from-right-6 duration-700 delay-100">
            <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2 hover:text-gray-900 transition-colors duration-300">
              Quick Links
            </h3>
            <ul className="text-sm space-y-1">
              <li className="animate-in fade-in duration-500 delay-400">
                <Link 
                onClick={()=>scrollTo(0,0)}
                  to="/" 
                  className="hover:underline hover:text-gray-900 transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Home
                </Link>
              </li>
              <li className="animate-in fade-in duration-500 delay-500">
                <Link 
                  to="/gotoblog" 
                  className="hover:underline hover:text-gray-900 transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Blogs
                </Link>
              </li>
              <li className="animate-in fade-in duration-500 delay-600">
                <Link 
                  to="/about" 
                  className="hover:underline hover:text-gray-900 transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  About Us
                </Link>
              </li>
              <li className="animate-in fade-in duration-500 delay-700">
                <Link 
                  to="/about" 
                  className="hover:underline hover:text-gray-900 transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="animate-in slide-in-from-right-6 duration-700 delay-200">
            <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2 hover:text-gray-900 transition-colors duration-300">
              Resources
            </h3>
            <ul className="text-sm space-y-1">
              <li className="animate-in fade-in duration-500 delay-400">
                <Link 
                  to="/about" 
                  className="hover:underline hover:text-gray-900 transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Privacy Policy
                </Link>
              </li>
              <li className="animate-in fade-in duration-500 delay-500">
                <Link 
                  to="/about" 
                  className="hover:underline hover:text-gray-900 transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li className="animate-in fade-in duration-500 delay-600">
                <Link 
                  to="/about" 
                  className="hover:underline hover:text-gray-900 transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  FAQs
                </Link>
              </li>
              <li className="animate-in fade-in duration-500 delay-700">
                <a 
                  href="/about" 
                  className="hover:underline hover:text-gray-900 transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Email Support
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="animate-in slide-in-from-right-6 duration-700 delay-300">
            <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2 hover:text-gray-900 transition-colors duration-300">
              Follow Us
            </h3>
            <ul className="text-sm space-y-1">
              <li className="animate-in fade-in duration-500 delay-400">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:underline hover:text-gray-900 transition-all duration-300 hover:translate-x-1 inline-block hover:scale-105"
                >
                  Instagram
                </a>
              </li>
              <li className="animate-in fade-in duration-500 delay-500">
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:underline hover:text-gray-900 transition-all duration-300 hover:translate-x-1 inline-block hover:scale-105"
                >
                  Twitter
                </a>
              </li>
              <li className="animate-in fade-in duration-500 delay-600">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:underline hover:text-gray-900 transition-all duration-300 hover:translate-x-1 inline-block hover:scale-105"
                >
                  Facebook
                </a>
              </li>
              <li className="animate-in fade-in duration-500 delay-700">
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:underline hover:text-gray-900 transition-all duration-300 hover:translate-x-1 inline-block hover:scale-105"
                >
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <p className="py-4 text-center text-sm md:text-base text-gray-500/80 animate-in fade-in duration-700 delay-900">
        © 2025 Pen Pixel. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;