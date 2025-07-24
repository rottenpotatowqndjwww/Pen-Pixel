import React, { useEffect, useRef, useState } from 'react';
import { assets, blogCategories } from '../../assets/assets';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { parse } from 'marked';

const AddBlog = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [category, setCategory] = useState('StartUp');
  const [isPublished, setIsPublished] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  
  const generateContent = async () => {
    if (!title) {
      return toast.error('Please enter a title');
    }
    if (!quillRef.current) {
      return toast.error('Editor not initialized');
    }

    try {
      setLoading(true);
      const { data } = await axios.post(
        '/api/blog/generate',
        { prompt: title },
        { withCredentials: true }
      );

      if (data.success && data.content) {
        const html = parse(data.content); // Parse Markdown to HTML
        quillRef.current.root.innerHTML = html;
      } else {
        toast.error(data.message || 'Failed to generate content');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Error generating content');
    } finally {
      setLoading(false);
    }
  };

  //  Blog Submit Handler
  const onSubmit = async (e) => {
    e.preventDefault();

    if (
      !quillRef.current?.root.innerHTML.trim() ||
      quillRef.current.root.innerHTML === '<p><br></p>'
    ) {
      return toast.error('Please enter blog content');
    }

    try {
      setIsAdding(true);

      const blog = {
        title,
        subTitle,
        description: quillRef.current.root.innerHTML,
        category,
        isPublished,
        image,
      };

      const formData = new FormData();
      formData.append('blog', JSON.stringify(blog));
      formData.append('image', image);

      const { data } = await axios.post('/api/blog/add', formData, {
        withCredentials: true,
      });

      if (data.success) {
        toast.success(data.message);
        setTitle('');
        setSubTitle('');
        setCategory('StartUp');
        setImage(false);
        quillRef.current.root.innerHTML = '';
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setIsAdding(false);
    }
  };

  //  Cleanup for memory leaks
  useEffect(() => {
    return () => {
      if (image && typeof image === 'object') {
        URL.revokeObjectURL(URL.createObjectURL(image));
      }
    };
  }, [image]);

  //  Initialize Quill Editor
  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Write your blog content here...',
      });
    }
  }, []);

  return (
    <form
      onSubmit={onSubmit}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-4 sm:p-6 lg:p-8 xl:p-12"
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 sm:px-8 py-6 border-b border-gray-200">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Create New Blog Post</h1>
            <p className="text-gray-300 mt-2 text-sm">Share your thoughts with the world</p>
          </div>

          <div className="p-6 sm:p-8 lg:p-10 space-y-8">
            {/* Image Upload */}
            <div>
              <label htmlFor="image" className="block text-sm font-semibold mb-1">Upload Thumbnail</label>
              <div className="mt-2">
                <img
                  src={!image ? assets.upload_area : URL.createObjectURL(image)}
                  alt="upload"
                  className="h-32 w-full max-w-xs rounded-md border-2 border-dashed border-gray-300 object-cover cursor-pointer"
                  onClick={() => document.getElementById('image').click()}
                />
              </div>
              <input
                type="file"
                id="image"
                hidden
                required
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            {/* Title & Subtitle */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">Subtitle</label>
                <input
                  type="text"
                  required
                  value={subTitle}
                  onChange={(e) => setSubTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border rounded-xl"
                />
              </div>
            </div>

            {/* Editor */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">Blog Description</label>
              <div className="relative border rounded-xl overflow-hidden">
                <div
                  ref={editorRef}
                  className="min-h-[200px] max-h-[400px] overflow-y-auto p-4 bg-white"
                />
                <button
                  type="button"
                  disabled={loading}
                  onClick={generateContent}
                  className="absolute bottom-3 right-3 text-sm bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800"
                >
                  {loading ? 'Generating...' : 'Generate with AI'}
                </button>
              </div>
            </div>

            {/* Category & Publish */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border rounded-xl"
                >
                  {blogCategories.map((cat, i) => (
                    <option key={i} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={() => setIsPublished(!isPublished)}
                  className="h-5 w-5"
                />
                <label className="text-sm font-medium text-gray-800">Publish Now</label>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isAdding}
                className="w-full bg-gray-900 text-white font-semibold py-3 rounded-xl hover:bg-gray-800"
              >
                {isAdding ? 'Adding Blog...' : 'Submit Blog Post'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddBlog;
