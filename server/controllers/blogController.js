import { readFileSync, unlinkSync } from 'fs';
import imagekit from '../connections/imagekit.js';
import Blog from '../models/blogModel.js';
import Comment from '../models/comment.js';
import main from '../connections/gemini.js';

//* Add a new blog
export const addBlog = async (req, res) => {
  try {
    console.log('Received blog:', req.body.blog);
    console.log('Uploaded image:', req.file);

    const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
    const imageFile = req.file;

    if (!title || !subTitle || !description || !category || !imageFile) {
      return res.status(400).json({
        success: false,
        message: "All fields must be provided"
      });
    }

    const fileBuffer = readFileSync(imageFile.path);

    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: '/blogs'
    });

    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: '1280' }
      ]
    });

    const newBlog = await Blog.create({
      title,
      subTitle,
      description,
      category,
      image: optimizedImageUrl,
      isPublished
    });

    try {
      unlinkSync(imageFile.path);
    } catch (err) {
      console.error('Failed to delete temp file:', err);
    }

    res.json({
      success: true,
      message: "Blog added successfully",
      blog: newBlog
    });
  } catch (error) {
    console.error('Error in addBlog:', error);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
      error: error.message
    });
  }
};

//* Get ALL blogs (for admin panel - both published and unpublished)
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}); // Remove the isPublished filter
    res.json({
      success: true,
      blogs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Some error occurred",
      error: error.message
    });
  }
};

//* Get only published blogs (for public-facing blog list)
export const getPublishedBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true });
    res.json({
      success: true,
      blogs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Some error occurred",
      error: error.message
    });
  }
};

//* Get a blog by its ID
export const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    res.json({
      success: true,
      blog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Some error occurred",
      error: error.message
    });
  }
};

//* Delete a blog by its ID
export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    await Blog.findByIdAndDelete(id);
    await Comment.deleteMany({ blog: id });

    res.json({
      success: true,
      message: "Blog deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Some error occurred",
      error: error.message
    });
  }
};

//* Toggle publish/unpublish for a blog
export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    blog.isPublished = !blog.isPublished;
    await blog.save();

    res.json({
      success: true,
      message: "Blog publish status updated successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Some error occurred",
      error: error.message
    });
  }
};

//* add comment to the database
export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;

    if (!blog || !name || !content) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    await Comment.create({ blog, name, content });

    res.json({
      success: true,
      message: "Comment added successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Some error occurred",
      error: error.message,
    });
  }
};

//* get comment data for individual blog
export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.body;

    if (!blogId) {
      return res.status(400).json({
        success: false,
        message: "Blog ID is required",
      });
    }

    const comments = await Comment.find({
      blog: blogId,
      isApproved: true,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      comments
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Some error occurred",
      error: error.message,
    });
  }
};


//* genrate content 
export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing prompt",
      });
    }

    const content = await main(`${prompt}. Generate a blog content for this topic in simple text format.`);

    res.status(200).json({
      success: true,
      content,
    });

  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({
      success: false,
      message: "Error occurred while generating content",
    });
  }
};
