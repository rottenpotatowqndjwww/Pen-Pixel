import React from 'react';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
  const { title, createdAt } = blog;
  const blogDate = new Date(createdAt);

  const deleteBlog = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    try {
      const { data } = await axios.post(
        '/api/blog/delete',
        { id: blog._id },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const togglePublish = async () => {
    try {
      const { data } = await axios.post(
        '/api/blog/toggle-publish',
        { id: blog._id },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <tr className='border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200'>
      <td className='px-4 py-4 text-sm font-medium text-gray-900 text-center'>
        {index}
      </td>
      <td className='px-4 py-4 text-sm text-gray-900 font-medium max-w-xs truncate'>
        {title}
      </td>
      <td className='px-4 py-4 text-sm text-gray-600 max-sm:hidden whitespace-nowrap'>
        {blogDate.toLocaleDateString()} {blogDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </td>
      <td className='px-4 py-4'>
        <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
          blog.isPublished 
            ? 'bg-green-100 text-green-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {blog.isPublished ? "Published" : "Unpublished"}
        </span>
      </td>
      <td className='px-4 py-4'>
        <div className='flex items-center gap-3'>
          <button 
            onClick={togglePublish}
            className={`px-3 py-1 text-xs font-medium rounded-md border transition-colors duration-200 ${
              blog.isPublished 
                ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100' 
                : 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100'
            }`}>
            {blog.isPublished ? "Unpublish" : "Publish"}
          </button>
          <button
            onClick={deleteBlog}
            className='px-3 py-1 text-xs font-medium rounded-md border bg-red-50 text-red-600 border-red-200 hover:bg-red-100 transition-colors duration-200'
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default BlogTableItem;
