import React from 'react';
import { assets } from '../../assets/assets';
import axios from 'axios';
import toast from 'react-hot-toast';

const CommentTableItem = ({ comment, fetchComment }) => {
  const { blog, createdAt, _id } = comment;
  const BlogDate = new Date(createdAt);

  const approveComment = async() =>{
    try {
      const {data} = await axios.post('/api/admin/approve-comment', {id: _id}, {withCredentials : true})

        if(data.success){
          toast.success(data.message)
          fetchComment()
        }else{
          toast.error(data.message)
        }
      }
     catch (error) {
      toast.error(error.message)
    }
  }
    const deleteComment = async() =>{
    try {
      const {data} = await axios.post('/api/admin/delete-comment', {id: _id}, {withCredentials : true})

        if(data.success){
          toast.success(data.message)
          fetchComment()
        }else{
          toast.error(data.message)
        }
      }
     catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <tr className="group hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-transparent transition-all duration-200">
      <td className="px-4 sm:px-6 py-5">
        <div className="space-y-3">
          {/* Blog Title */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-100 text-blue-800 text-xs font-medium">
              📝 Blog
            </span>
            <span className="text-gray-900 font-semibold text-sm leading-relaxed">
              {blog.title}
            </span>
          </div>
          
          {/* Commenter Name */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <span className="inline-flex items-center px-2 py-1 rounded-md bg-purple-100 text-purple-800 text-xs font-medium">
              👤 Name
            </span>
            <span className="text-gray-800 font-medium text-sm">
              {comment.name}
            </span>
          </div>
          
          {/* Comment Content */}
          <div className="space-y-2">
            <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-medium">
              💬 Comment
            </span>
            <p className="text-gray-700 text-sm leading-relaxed pl-0 sm:pl-2 bg-gray-50/50 p-3 rounded-lg border-l-4 border-gray-200 max-w-2xl">
              {comment.content}
            </p>
          </div>
        </div>
      </td>
      
      <td className="px-4 sm:px-6 py-5 align-top">
        <div className="flex flex-col items-start">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium">
            📅 {BlogDate.toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </div>
          <span className="text-gray-500 text-xs mt-1">
            {BlogDate.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        </div>
      </td>
      
      <td className="px-4 sm:px-6 py-5 align-top">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {!comment.isApproved ? (
            <button className="group/btn inline-flex items-center gap-2 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 hover:border-emerald-300 rounded-lg text-emerald-700 hover:text-emerald-800 text-xs font-medium transition-all duration-200 hover:shadow-sm"
            onClick={approveComment}
            >
              <img
                src={assets.tick_icon}
                alt="Approve"
                className="w-4 h-4 group-hover/btn:scale-110 transition-transform"
              />
              <span className="hidden sm:inline">Approve</span>
            </button>
          ) : (
            <div className="inline-flex items-center gap-2 px-3 py-2 bg-emerald-100 border border-emerald-200 rounded-lg">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-emerald-700 text-xs font-semibold">
                Approved
              </span>
            </div>
          )}
          
          <button className="group/btn inline-flex items-center gap-2 px-3 py-2 bg-red-50 hover:bg-red-100 border border-red-200 hover:border-red-300 rounded-lg text-red-700 hover:text-red-800 text-xs font-medium transition-all duration-200 hover:shadow-sm"
          onClick={deleteComment}
          >
            <img
              src={assets.bin_icon}
              alt="Delete"
              className="w-4 h-4 group-hover/btn:scale-110 transition-transform"
            />
            <span className="hidden sm:inline">Delete</span>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItem;