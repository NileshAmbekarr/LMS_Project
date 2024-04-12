
import express from 'express';
import cors from 'cors';
import config from 'dotenv';
import cookieParser from 'cookie-parser';
const app = express();

app.use(express.json());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials : true
}))

app.use(cookieParser());

app.use('/ping ', function(req, res){
    res.send('/pong')
    // To check the server is active or NOT 
})

// define routes of 3 modules 


// if user goes to undefined URL 
app.all('*', (req, res) => {
    res.send(404).send('OOPS!! 404 Page not FOUND')
})

import userRoutes from './routes/user.routes.js'
app.use('/api/user', userRoutes)
export default app;
