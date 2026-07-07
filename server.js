
import express from "express"; //es6 modulling
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from "./config/db.js";
import authRoutes from './routes/authRoutes.js';


dotenv.config();

const app = express();

await connectDB();

app.use(cors());

app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;


// API
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: "SkillPath AI Backend is Running 🚀"
    })
})

app.listen(PORT, () => {
    console.log((`Server is running on port: ${PORT} `))
})
