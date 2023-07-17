    // when ever we will type the command npm run dev it will run the index fil for us 
const express =require('express');
const authRouter = require('./routes/auth');
const mongoose = require('mongoose');
const PORT=process.env.PORT ||8000;
const adminRouter = require('./routes/admin');

const app = express();
// for@ we have used a  %40 
const DB="mongodb+srv://yashmaggu299:Suman%409034@cluster0.czuxvoq.mongodb.net/?retryWrites=true&w=majority".toString();


const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
const Router = require("./routes/auth"); 
// creating a server

app.use(express.json());
app.use(authRouter);
app.use(adminRouter);
app.use(productRouter);
app.use(userRouter);



mongoose.connect(DB).then(()=>{
    console.log('connection successful');
}).catch((e) => {console.log(e);});

app.listen(PORT,"0.0.0.0", ()=>{
    console.log(`Connected to port ${PORT}`);
}) ;