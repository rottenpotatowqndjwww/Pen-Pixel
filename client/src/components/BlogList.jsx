import React, { useState } from 'react'
import { blog_data, blogCategories } from '../assets/assets'
import { motion } from "framer-motion"
import BlogCard from './BlogCard'
import { Bold } from 'lucide-react'
import { useAppContext } from '../context/appContext'

const BlogList = () => {
  const [menu, setMenu] = useState("All")
  const {blogs , input} = useAppContext()

  const filterdBlogs = ()=> {
    if(input === ''){
      return blogs
    }
    return blogs.filter((blog)=>blog.title.toLowerCase().includes(input.toLowerCase()) || blog.category.toLowerCase().includes(input.toLowerCase()))
  }
  
  return (
    <div>
      <div className='flex flex-wrap justify-center gap-3 sm:gap-6 my-10 px-4'>
        {blogCategories.map((item) => (
          <div key={item} className='relative'>
            <button 
              className={`
                relative px-6 py-3 rounded-full font-medium text-sm sm:text-base
                transition-all duration-300 ease-in-out transform
                border-2 hover:scale-105 active:scale-95
                ${menu === item 
                  ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30' 
                  : 'bg-gray-800/50 text-white border-gray-500 hover:border-primary hover:text-white hover:bg-primary/20 hover:shadow-md'
                }
                backdrop-blur-sm
                focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-gray-900
              `}
              onClick={() => {setMenu(item)}}
              aria-pressed={menu === item}
              role="tab"
            >
              <span className="relative z-10">{item}</span>
              
              {/* Animated background for active state */}
              {menu === item && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 rounded-full animate-pulse"></div>
              )}
              
              {/* Subtle glow effect */}
              <div className={`
                absolute inset-0 rounded-full transition-opacity duration-300
                ${menu === item 
                  ? 'opacity-100 bg-primary/20 blur-md' 
                  : 'opacity-0 group-hover:opacity-50 bg-primary/10 blur-md'
                }
              `}></div>
            </button>
          </div>
        ))}
      </div>
      
      <div className="px-4 sm:px-8 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-24">
          {filterdBlogs().filter((blog) => menu === "All" ? true : blog.category === menu).map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlogList