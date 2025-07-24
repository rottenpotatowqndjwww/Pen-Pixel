import express from 'express'
import { adminLogin, adminLogout, approveCommentbyID, authAdmin, dashBoardData, deleteCommentbyID, getAllComments } from '../controllers/adminController.js';
import { getAllBlogs } from '../controllers/blogController.js';
import auth from '../middlewares/auth.js'

const adminRouter = express.Router();

adminRouter.post('/login',adminLogin)
adminRouter.get('/comments', auth , getAllComments)
adminRouter.get('/blogs', auth ,getAllBlogs)
adminRouter.post('/delete-comment',auth, deleteCommentbyID)
adminRouter.post('/approve-comment',auth,approveCommentbyID)
adminRouter.get('/dashboard',auth, dashBoardData)
adminRouter.get('/auth-admin', authAdmin)
adminRouter.post('/logout',auth, adminLogout)
export default adminRouter