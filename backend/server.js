const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require("./routes/userRoutes");
const chatsRoutes = require("./routes/chatsRoutes");

const {notFound,errorHandler} = require("./middlewares/errorMiddleware")

const app = express();
dotenv.config();
connectDB();

app.use(express.json());


app.get('/',(req,res)=>{
    res.send("API is running Successfully ");
})
app.use('/talknet/user',userRoutes);
app.use("/talknet/chats",chatsRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000

app.listen(5000 , console.log(`Server started on port ${PORT}`));