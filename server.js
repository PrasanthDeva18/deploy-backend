const express = require('express');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser')

const db = require('./config/db')();
const bodyParser = require('body-parser');
const cors = require('cors')
const corsOptions = require('./config/corsOptions')




// app.use(express.json());
// app.use(cookieParser());

app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors(corsOptions));
app.use(cookieParser())


//Routes
const AuthRoutes = require('./Routes/User');
const ProductRoutes = require('./Routes/District')

//Admin Auth Routes
app.use('/user',AuthRoutes)
app.use('/product',ProductRoutes)


const server =app.listen(process.env.PORT,()=>{
    console.log(`server is listening on the ${process.env.PORT}`)
})

process.on('unhandledRejection', (err) => {
    console.log(`Err : ${err.message}`);
    console.log("Shutting down the server to unhandled rejection");
    server.close(() => {
        process.exit(1);
    })
});

process.on('uncaughtException', (err) => {
    console.log(`Err : ${err.message}`);
    console.log("Shutting down the server to uncaught Exception error");
    server.close(() => {
        process.exit(1);
    });
})
