import express, { Router } from 'express'
import { 
  addBlog, 
  addComment, 
  deleteBlogById, 
  getAllBlogs, 
  getPublishedBlogs, 
  getBlogById, 
  getBlogComments, 
  togglePublish, 
  generateContent
} from '../controllers/blogController.js';
import upload from '../middlewares/multer.js'
import auth from '../middlewares/auth.js'

const blogRouter = express.Router();

//* post the blog
blogRouter.post('/add', auth, upload.single('image'), addBlog)

//* get all blogs (for admin - includes unpublished)
blogRouter.get('/admin/all', auth, getAllBlogs)

//* get only published blogs (for public)
blogRouter.get('/all', getPublishedBlogs)

//* get blog by id
blogRouter.get('/:blogId', getBlogById)

//* delete blog
blogRouter.post('/delete', auth, deleteBlogById)

//* toggle publish
blogRouter.post('/toggle-publish', auth, togglePublish)

//* add comments 
blogRouter.post('/add-comment', addComment)

//*get comments
blogRouter.post('/get-comments', getBlogComments)

//* generate blog using gemini
blogRouter.post('/generate', auth , generateContent)

export default blogRouter;