import React, { useEffect, useState } from 'react';
import { comments_data } from '../../assets/assets';
import CommentTableItem from '../../components/admin/CommentTableItem';
import axios from 'axios'
import toast from 'react-hot-toast'
const Comments = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFiler] = useState('Not Approved');

  const fetchComments = async () => {
    try {
      const {data} = await axios.get('/api/admin/comments', {withCredentials :true})
      if(data.success){
        setComments(data.comments)
        
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      toast.error(error.message)
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className='flex-1 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-4 sm:p-6 lg:p-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Header Section */}
        <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6'>
          <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4'>
            <div>
              <h1 className='text-2xl lg:text-3xl font-bold text-gray-900 mb-1'>
                Comments Management
              </h1>
              <p className='text-gray-600 text-sm'>
                Review and manage blog comments
              </p>
            </div>
            
            {/* Filter Buttons */}
            <div className='flex gap-2 sm:gap-3'>
              <button
                onClick={() => setFiler('Approved')}
                className={`transition-all duration-200 shadow-sm border-2 rounded-xl px-4 py-2 text-sm font-medium ${
                  filter === 'Approved' 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-emerald-100/50' 
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                ✓ Approved
              </button>
              <button
                onClick={() => setFiler('Not Approved')}
                className={`transition-all duration-200 shadow-sm border-2 rounded-xl px-4 py-2 text-sm font-medium ${
                  filter === 'Not Approved' 
                    ? 'bg-amber-50 text-amber-700 border-amber-200 shadow-amber-100/50' 
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                ⏳ Pending
              </button>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-200'>
                <tr>
                  <th className='text-left px-4 sm:px-6 py-4 text-gray-700 font-semibold text-sm uppercase tracking-wide'>
                    Blog Title & Comment
                  </th>
                  <th className='text-left px-4 sm:px-6 py-4 text-gray-700 font-semibold text-sm uppercase tracking-wide min-w-32'>
                    Date
                  </th>
                  <th className='text-left px-4 sm:px-6 py-4 text-gray-700 font-semibold text-sm uppercase tracking-wide min-w-28'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-100'>
                {comments
                  .filter((comment) => {
                    if (filter === 'Approved') return comment.isApproved === true;
                    return comment.isApproved === false;
                  })
                  .map((comment, index) => (
                    <CommentTableItem
                      key={comment._id}
                      comment={comment}
                      index={index + 1}
                      fetchComment={fetchComments}
                    />
                  ))}
              </tbody>
            </table>
          </div>
          
          {/* Empty State */}
          {comments.filter((comment) => {
            if (filter === 'Approved') return comment.isApproved === true;
            return comment.isApproved === false;
          }).length === 0 && (
            <div className='text-center py-12'>
              <div className='text-gray-400 text-lg mb-2'>📝</div>
              <p className='text-gray-500 font-medium mb-1'>No {filter.toLowerCase()} comments</p>
              <p className='text-gray-400 text-sm'>Comments will appear here when available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;