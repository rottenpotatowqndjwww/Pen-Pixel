
import jwt from 'jsonwebtoken'
import Blog from '../models/blogModel.js'
import Comment from '../models/comment.js'

//* admin login 
export const adminLogin = async(req , res)=>{
  try {
    const {email,password} = req.body

    //* unsucesfull
    if(!email || !password){
       return res.json({
        success : false,
        message : "Invalid Email Or Password"
      })
    }

    if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD ){
       return res.json({
        success : false,
        message : "Invalid Email Or Password"
      })
    }
    //* sucessfull then send the jwt as a response to the client
    //* fomat fot jwt jwt.sign( data to sigh, secretkey , expiry date  )
    const token = jwt.sign({email}, process.env.SECRET_KEY, {expiresIn : '1D'}  )
      res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      maxAge: 24 * 60 * 60 * 1000 
    });

     res.json({ success: true, message: "Logged in successfully" });

  } catch (error) {
    res.json({
      success : false,
      message : error.message
    })
  }
}

//* get all blogs from db
 export const getAllBlogsAdmin = async(req,res)=>{
  try {
    const blogs = await Blog.find({}).sort({createdAt : -1})
    res.json({
      success : true,
      blogs
    })
  } catch (error) {
      res.json({
      success : false,
      message : error.message
    })
  }
 }

 //* get all comments 

 export const getAllComments = async(req,res)=>{
  try {
    const comments = await Comment.find({}).populate("blog").sort({createdAt : -1})
    res.json({
      success : true,
      comments
    })
  } catch (error) {
    res.json({
      success : false,
      message : error.message
    })
  }
 }

 //* get dashboard data
export const dashBoardData = async (req, res) => {
  try {
    const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
    const blogs = await Blog.countDocuments();
    const comments = await Comment.countDocuments();
    const drafts = await Blog.countDocuments({ isPublished: false });

    const dashboardData = { blogs, comments, drafts, recentBlogs };

    res.json({
      success: true,
      dashboardData,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};


 //* const delete comment by id 
  export const  deleteCommentbyID = async(req,res) =>{
    try {
      const {id} = req.body
      await Comment.findByIdAndDelete(id)
      res.json({
      success : true,
      message : "Sucessfull deleted"
    })
    } catch (error) {
      res.json({
      success : false,
      message : error.message
    })
    }
 }
 //* approve the comment by id

  export const approveCommentbyID = async(req,res) =>{
    try {
      const {id} = req.body
      await Comment.findByIdAndUpdate(id, {isApproved : true})
      res.json({
      success : true,
      message : "Sucessfull Approved"
    })
    } catch (error) {
      res.json({
      success : false,
      message : error.message
    })
    }
 }

 //* authenticate the admin 

// controllers/adminController.js

export const authAdmin = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ success: false, message: "No token found" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: "Invalid or expired token" });
  }
};

//*logout admin
export const adminLogout = (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return res.json({
      success: true,
      message: 'Admin logged out successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong during logout',
    });
  }
};