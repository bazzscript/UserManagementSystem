const express = require("express"), app = express();
const dotenv = require("dotenv");
const  morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");
const connectDB = require('./server/database/connection');


dotenv.config({path:'config.env'});
const PORT = process.env.PORT || 8080;

//log requests
app.use(morgan('tiny'))

//mongodb connection
connectDB();

//parse request to body-parser
app.use(bodyparser.urlencoded({extended: true}))

//ser view engine
app.set("view engine", "ejs")
// app.set("views", path.resolve(__dirname, "views/ejs"))

//load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))

//load routes
app.use('/', require("./server/routes/router"))















app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`) });