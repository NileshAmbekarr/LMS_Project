
import config from 'dotenv';
config();
import app from './app.js'

const port = process.env.PORT || 5000;

app.listen(port, ()=> {
    console.log(`Server running at https://localhost:${port}/`);
})