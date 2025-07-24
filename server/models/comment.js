import mongoose from 'mongoose';
import './blogModel.js'; // ✅ This line is required to register the 'blog' model

const commentSchema = new mongoose.Schema({
  blog: { type: mongoose.Schema.Types.ObjectId, ref: 'blog', required: true },
  name: { type: String, required: true },
  content: { type: String, required: true },
  isApproved: { type: Boolean, default: false }
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
