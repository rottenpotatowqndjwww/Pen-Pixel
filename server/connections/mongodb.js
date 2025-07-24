import mongoose from "mongoose";
import 'dotenv/config'

// *making connection with the databse
const mongodb = async() => {
  try {
    mongoose.connection.on("connected", ()=>{
      console.log("Databse Connected");
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/penpixel`)
  } catch (error) {
    console.log(error.message); 
  }
}

export default mongodb;