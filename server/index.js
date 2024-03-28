const express= require('express');
const cookie= require('cookie-parser');
const cors= require('cors');
const home= require('./route/index');
const connectDB= require('./db/index');

require('dotenv').config();

const app= express();

const port= process.env.PORT;

app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookie());
app.use(express.static('public'));

app.use('/', home);

const startServer= function(){
    try{
        connectDB().then(()=>{console.log(`Database connected successfully...`)});
        app.listen(port, ()=>{
            console.log(`Server started on port ${port}`)
        })
    }catch(err){
        console.log('Something went wrong!')
        console.log(err);
    }
}
startServer();