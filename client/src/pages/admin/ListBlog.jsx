import React, { useEffect, useState } from 'react';
import BlogTableItem from '../../components/admin/BlogTableItem';
import axios from 'axios'
import { toast } from 'react-hot-toast';
const ListBlog = () => {
  const [blogs, setBlogs] = useState([]); 

  const fetchBlogs = async () => {
    try {
      const {data} = await axios.get('/api/admin/blogs', { withCredentials: true } )
    if(data.success){
      setBlogs(data.blogs)
    }else{
      toast.error(data.message)
    }
    } catch (error) {
      toast.error(error.message)
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-10 bg-gray-50 min-h-screen">
      <h1 className="text-xl font-semibold text-gray-700 mb-6">All Blogs</h1>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">#</th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Blog Title</th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider max-sm:hidden">Date Created</th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {blogs.length > 0 ? (
              blogs.map((blog, index) => (
                <BlogTableItem
                  key={blog._id}
                  blog={blog}
                  fetchBlogs={fetchBlogs}
                  index={index + 1}
                />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-8 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="bg-gray-100 p-3 rounded-full">
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <p className="text-gray-500 font-medium">No blogs found</p>
                    <p className="text-gray-400 text-sm">Create your first blog post to get started</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListBlog;
