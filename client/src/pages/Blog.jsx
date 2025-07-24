import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets.js';
import Moment from 'moment';
import { Facebook, Twitter, Globe } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Blog = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`api/blog/${id}`);
      if (data.success) {
        setData(data.blog);
      } else {
        toast.error(data.message || "Failed to load blog");
      }
    } catch (error) {
      toast.error(error.message || "Error loading blog");
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await axios.post('api/blog/get-comments', { blogId: id });
      if (data.success) {
        setComments(data.comments);
      } else {
        toast.error(data.message || "Failed to load comments");
      }
    } catch (error) {
      toast.error(error.message || "Error loading comments");
    }
  };

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, [id]);

  const addcomment = async (e) => {
    e.preventDefault(); // Prevent form reload

    try {
      const { data } = await axios.post('api/blog/add-comment', {
        blog: id,
        name,
        content
      });

      if (data.success) {
        toast.success(data.message || "Comment added for review");
        setName('');
        setContent('');
        fetchComments(); // Refresh comments
      } else {
        toast.error(data.message || "Failed to add comment");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Error adding comment");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-white">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900 text-center">Blog Not Found</h2>
        <p className="text-center text-gray-600 max-w-md">
          The blog post you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-white text-gray-900">
      {/* Header Section */}
      <header className="relative px-4 sm:px-6 lg:px-8 xl:px-12">
        <img
          src={assets.gradientBackground}
          alt="gradient background"
          className="absolute inset-0 w-full h-full object-cover -z-10 opacity-20 sm:opacity-30"
        />

        <div className="max-w-4xl mx-auto text-center py-12 sm:py-16 md:py-20 lg:py-24 animate-fade-in">
          <p className="text-xs sm:text-sm md:text-base font-medium mb-3 sm:mb-4 text-gray-500 sm:text-gray-600">
            Published On {Moment(data.createdAt).format('MMMM Do YYYY')}
          </p>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4 sm:mb-6 px-2 sm:px-4 text-gray-900">
            {data.title}
          </h1>

          <div
            className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed mb-6 sm:mb-8 px-2 sm:px-4 max-w-3xl mx-auto text-gray-600 sm:text-gray-700"
            dangerouslySetInnerHTML={{ __html: data.subTitle }}
          />

          <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium bg-gray-50 sm:bg-gray-100 text-gray-700 sm:text-gray-800 border border-gray-200 sm:border-gray-300">
            <span>Author: Michael Jackson</span>
          </div>
        </div>
      </header>

      {/* Blog Image */}
      <section className="px-4 sm:px-6 lg:px-8 xl:px-12 mb-6 sm:mb-8 md:mb-12 animate-fade-in">
        <div className="max-w-5xl mx-auto">
          <img
            src={data.image}
            alt={`Thumbnail for ${data.title}`}
            className="w-full h-auto rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl object-cover shadow-md sm:shadow-lg md:shadow-xl"
          />
        </div>
      </section>

      {/* Blog Content */}
      <section className="px-4 sm:px-6 lg:px-8 xl:px-12 pb-12 sm:pb-16 md:pb-20">
        <div className="max-w-3xl mx-auto">
          <div
            className="rich-text animate-fade-in text-gray-700 sm:text-gray-800 text-sm sm:text-base md:text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        </div>
      </section>

      {/* Comment Section */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        {/* Comment count header */}
        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Comments ({comments.length})</h2>
        </div>

        {/* Comments list */}
        <div className="space-y-4 sm:space-y-6">
          {comments.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg sm:rounded-xl shadow-sm sm:shadow border border-gray-100 sm:border-gray-200 p-4 sm:p-6 transition-all duration-200 hover:shadow-md hover:border-gray-300"
            >
              {/* Comment header */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-0 mb-2 sm:mb-3">
                <h3 className="font-medium text-gray-900 text-sm sm:text-base">{item.name}</h3>
                <span className="text-xs sm:text-sm text-gray-400 sm:text-gray-500">
                  {Moment(item.createdAt).fromNow()}
                </span>
              </div>

              {/* Comment content */}
              <p className="text-gray-600 sm:text-gray-700 whitespace-pre-line text-sm sm:text-base leading-relaxed">
                {item.content}
              </p>
            </div>
          ))}
        </div>

        {/* Add new Comment */}
        <div className="mt-8 sm:mt-12 md:mt-14 bg-white rounded-lg sm:rounded-xl shadow-sm sm:shadow border border-gray-100 sm:border-gray-200 p-4 sm:p-6 transition-all duration-200 hover:shadow-md hover:border-gray-300">
          <p className="font-semibold text-lg sm:text-xl text-gray-900 mb-4 sm:mb-6">Leave a Comment</p>

          <form onSubmit={addcomment} className="flex flex-col gap-4 sm:gap-5">
            <div className="space-y-1 sm:space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-700 sm:text-gray-800">
                Name
              </label>
              <input
                type="text"
                value={name}
                name="name"
                required
                placeholder="Enter your name"
                className="w-full p-3 sm:p-4 text-sm sm:text-base border border-gray-200 sm:border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 bg-gray-50 sm:bg-white"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>

            <div className="space-y-1 sm:space-y-2">
              <label htmlFor="comment" className="text-sm font-medium text-gray-700 sm:text-gray-800">
                Comment
              </label>
              <textarea
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                value={content}
                id="comment"
                name="comment"
                required
                placeholder="Write your comment here..."
                className="w-full p-3 sm:p-4 text-sm sm:text-base border border-gray-200 sm:border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 min-h-[120px] sm:min-h-[150px] resize-y bg-gray-50 sm:bg-white"
              />
            </div>

            <button
              type="submit"
              className="px-5 sm:px-6 py-2.5 sm:py-3 bg-gray-900 text-white text-sm sm:text-base font-medium rounded-lg hover:bg-gray-800 active:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] self-start shadow-sm hover:shadow-md"
            >
              Post Comment
            </button>
          </form>
        </div>

        {/* Social media icons */}
        <div className="mt-8 sm:mt-10 md:mt-12 max-w-sm mx-auto px-4">
          <p className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 text-center">Share This Article</p>
          <div className="flex justify-center items-center gap-6 sm:gap-8">
            <a
              href="#"
              aria-label="Share on Facebook"
              className="text-gray-600 hover:text-blue-600 transition-colors duration-300 transform hover:scale-110 active:scale-95 p-2 rounded-full hover:bg-blue-50"
            >
              <Facebook size={24} className="sm:w-7 sm:h-7" />
            </a>
            <a
              href="#"
              aria-label="Share on Twitter"
              className="text-gray-600 hover:text-sky-500 transition-colors duration-300 transform hover:scale-110 active:scale-95 p-2 rounded-full hover:bg-sky-50"
            >
              <Twitter size={24} className="sm:w-7 sm:h-7" />
            </a>
            <a
              href="#"
              aria-label="Share on Google"
              className="text-gray-600 hover:text-red-600 transition-colors duration-300 transform hover:scale-110 active:scale-95 p-2 rounded-full hover:bg-red-50"
            >
              <Globe size={24} className="sm:w-7 sm:h-7" />
            </a>
          </div>
        </div>
      </section>
    </article>
  );
};

export default Blog;
