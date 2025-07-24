import mongoose from 'mongoose'

// * creating a mongoDb schema
const blogSchema = new mongoose.Schema({
  title : {type :String , required : true},
  subTitle : {type :String , required : true},
  description : {type :String , required : true},
  category : {type :String , required : true},
  image : {type :String , required : true},
  isPublished : {type :Boolean , required : true},
},{ timestamps : true })

//*creating the blog mdoel
const Blog = mongoose.model('blog', blogSchema)
export default Blog