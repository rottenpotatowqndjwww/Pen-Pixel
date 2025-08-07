// * all the imports
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongodb from './connections/mongodb.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';
import cookieParser from 'cookie-parser';

// * all the destructuring
const app = express();

// * call the MongoDB connection
await mongodb();

// * Allowed origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://pen-pixel-client.vercel.app'
];

// * Middlewares
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// * Main routes
app.use('/api/admin', adminRouter);
app.use('/api/blog', blogRouter);

// * Test route
app.get('/', (req, res) => {
  res.send("Server Is Running");
});

// * Port
const port = process.env.PORT_NUMBER || 5000;

app.listen(port, () => {
  console.log(`✅ Server is running at http://localhost:${port}`);
});
