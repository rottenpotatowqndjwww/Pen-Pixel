import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Sidebar = () => {
  return (
    <aside className="flex flex-col bg-white border-r border-gray-300 min-h-screen w-16 md:w-72 pt-6">
      <NavLink
        end={true}
        to="/admin"
        className={({ isActive }) =>
          `group flex items-center gap-3 py-4 px-4 md:px-6 mx-3 rounded-lg transition-colors duration-200 ${
            isActive
              ? 'bg-blue-100 text-blue-700 border border-blue-300'
              : 'text-gray-700 hover:bg-gray-100'
          }`
        }
      >
        <img
          src={assets.home_icon}
          alt="Dashboard"
          className="w-5 md:w-6 min-w-[1.25rem] md:min-w-[1.5rem]"
        />
        <p className="hidden md:inline-block text-sm font-medium tracking-wide">
          Dashboard
        </p>
      </NavLink>

      <NavLink
        to="/admin/addBlog"
        className={({ isActive }) =>
          `group flex items-center gap-3 py-4 px-4 md:px-6 mx-3 rounded-lg transition-colors duration-200 ${
            isActive
              ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
              : 'text-gray-700 hover:bg-gray-100'
          }`
        }
      >
        <img
          src={assets.add_icon}
          alt="Add Blog"
          className="w-5 md:w-6 min-w-[1.25rem] md:min-w-[1.5rem]"
        />
        <p className="hidden md:inline-block text-sm font-medium tracking-wide">
          Add Blog
        </p>
      </NavLink>

      <NavLink
        to="/admin/listBlog"
        className={({ isActive }) =>
          `group flex items-center gap-3 py-4 px-4 md:px-6 mx-3 rounded-lg transition-colors duration-200 ${
            isActive
              ? 'bg-amber-100 text-amber-700 border border-amber-300'
              : 'text-gray-700 hover:bg-gray-100'
          }`
        }
      >
        <img
          src={assets.blog_icon}
          alt="Blog Lists"
          className="w-5 md:w-6 min-w-[1.25rem] md:min-w-[1.5rem]"
        />
        <p className="hidden md:inline-block text-sm font-medium tracking-wide">
          Blog Lists
        </p>
      </NavLink>

      <NavLink
        to="/admin/comments"
        className={({ isActive }) =>
          `group flex items-center gap-3 py-4 px-4 md:px-6 mx-3 rounded-lg transition-colors duration-200 ${
            isActive
              ? 'bg-pink-100 text-pink-700 border border-pink-300'
              : 'text-gray-700 hover:bg-gray-100'
          }`
        }
      >
        <img
          src={assets.comment_icon}
          alt="Comments"
          className="w-5 md:w-6 min-w-[1.25rem] md:min-w-[1.5rem]"
        />
        <p className="hidden md:inline-block text-sm font-medium tracking-wide">
          Comments
        </p>
      </NavLink>
    </aside>
  );
};

export default Sidebar;
