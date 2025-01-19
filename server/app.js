const express = require('express');
const dot_env = require('dotenv');
const connectDb = require('./app/config/db.config');
const router = require('./app/routes/index');
const setupPassport = require('./app/utils/passport');
const cors = require('cors');  
const app = express();
dot_env.config();
connectDb();
app.use(cors({
    origin: 'http://localhost:3000', // Allow your frontend 
    credentials: true,}
));
setupPassport(app);


app.use(express.static(__dirname + '/public'));


app.use(express.static('/uploads'));
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // For JSON bodies



app.use(router);

const PORT = process.env.PORT || 5200;

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
    
})