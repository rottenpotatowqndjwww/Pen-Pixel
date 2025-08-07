
// * all the imports 
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongodb from './connections/mongodb.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';
import cookieParser from 'cookie-parser';

// * all the destructuring
const app = express();

// * calling the connections
await mongodb();

//* middlewares
import cors from 'cors';

const allowedOrigins = [
  'http://localhost:5173',
  'https://pen-pixel-client.vercel.app'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));


app.use(express.json())
app.use(cookieParser())



// * all stored variables
const port = process.env.PORT_NUMBER ||  5000;

//*all main routes
app.use('/api/admin', adminRouter)
app.use('/api/blog', blogRouter)


//* testing the server
app.get('/',(req,res)=>{
  res.send("Server Is Running")
})

//* setting up the port 
app.listen(5000, ()=>{
  console.log(`Server is runnning on port htttp//localhost:${port}`);
})

