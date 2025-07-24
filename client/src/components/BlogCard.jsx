import React from 'react'
import { useNavigate } from 'react-router-dom'

const BlogCard = ({ blog }) => {
  const navigate = useNavigate()
  const { title, _id, description, category, image } = blog

  return (
  <article 
    onClick={() => {navigate(`/blog/${_id}`); scrollTo(0,0)}}
    className="group relative w-full bg-gray-900/60 backdrop-blur-sm border border-gray-800/40 
               rounded-2xl overflow-hidden cursor-pointer
               transform transition-all duration-500 ease-out
               hover:scale-[1.03] hover:-translate-y-3 hover:shadow-2xl hover:shadow-black/30
               hover:border-primary/40 hover:bg-gray-800/70
               focus:scale-[1.03] focus:-translate-y-3 focus:shadow-2xl focus:shadow-black/30
               focus:border-primary/40 focus:bg-gray-800/70 focus:outline-none focus:ring-2 focus:ring-primary/50
               active:scale-[0.99] active:translate-y-0"
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        navigate(`/blog/${_id}`)
      }
    }}
    aria-label={`Read article: ${title}`}
  >
    {/* Image Container */}
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 aspect-[16/10]">
      {image ? (
        <img 
          src={image} 
          alt=""
          className="w-full h-full object-cover 
                     transition-all duration-700 ease-out
                     group-hover:scale-110 group-hover:brightness-110
                     group-focus:scale-110 group-focus:brightness-110"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800">
          <svg className="w-16 h-16 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        </div>
      )}
      
      {/* Image Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent 
                     opacity-0 group-hover:opacity-100 group-focus:opacity-100 
                     transition-opacity duration-300"></div>
      
      {/* Category Badge */}
      {category && (
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold
                          bg-primary/90 text-white backdrop-blur-sm border border-white/10
                          transform transition-all duration-300
                          group-hover:bg-primary group-hover:scale-105 group-hover:shadow-lg
                          group-focus:bg-primary group-focus:scale-105 group-focus:shadow-lg">
            {category}
          </span>
        </div>
      )}
      
      {/* Read More Indicator */}
      <div className="absolute bottom-4 right-4 opacity-0 
                     group-hover:opacity-100 group-focus:opacity-100
                     transform translate-x-3 group-hover:translate-x-0 group-focus:translate-x-0
                     transition-all duration-400">
        <div className="flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-md 
                       rounded-full text-white border border-white/20 shadow-lg">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>

    {/* Content Section */}
    <div className="p-5 sm:p-6 space-y-4">
      {/* Title */}
      <h3 className="font-bold text-lg sm:text-xl text-white leading-snug
                    group-hover:text-primary group-focus:text-primary 
                    transition-colors duration-300
                    line-clamp-3 min-h-[4.5rem]">
        {title || 'Untitled Article'}
      </h3>
      
      {/* Description */}
      <p className="text-gray-300 text-sm sm:text-base leading-relaxed
                   group-hover:text-gray-200 group-focus:text-gray-200 
                   transition-colors duration-300
                   line-clamp-3 min-h-[4.5rem]">
        {description ? 
          (() => {
            // Remove HTML tags and decode HTML entities
            const cleanDescription = description
              .replace(/<[^>]*>/g, '') // Remove HTML tags
              .replace(/&lt;/g, '<')
              .replace(/&gt;/g, '>')
              .replace(/&amp;/g, '&')
              .replace(/&quot;/g, '"')
              .replace(/&#39;/g, "'")
              .replace(/&nbsp;/g, ' ')
              .trim()
            
            return cleanDescription.length > 120 
              ? cleanDescription.slice(0, 120).trim() + '...'
              : cleanDescription
          })()
          : 'No description available'
        }
      </p>
      
      {/* Read More Link */}
      <div className="pt-2">
        <span className="inline-flex items-center text-sm font-semibold text-primary
                        opacity-0 group-hover:opacity-100 group-focus:opacity-100
                        transform translate-y-2 group-hover:translate-y-0 group-focus:translate-y-0
                        transition-all duration-400 delay-75">
          Read article
          <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 group-focus:translate-x-1 
                         transition-transform duration-300" 
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </div>
    </div>
    
    {/* Bottom Accent Line */}
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent
                   transform scale-x-0 group-hover:scale-x-100 group-focus:scale-x-100
                   transition-transform duration-600 ease-out origin-center"></div>
  </article>
)
}

export default BlogCard