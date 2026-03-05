const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const generateToken = require("../config/generateToken")

const registerUser = asyncHandler(async(req,res)=>{
    const {name,email,password,profileImg} = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please Enter all the Fields");
    }

    const userExists = await User.findOne({ email});

    if(userExists){
        res.status(400);
        throw new Error("User already exists")
    }
    const user = await User.create({
        name,
        email,
        password,
        profileImg,
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImg: user.profileImg,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("Failed to Create the User")
    }
});

const  authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({ email});
    if(user && (await user.matchPassword(password))){
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            profileImg: user.profileImg,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(401);
        throw new Error("Invalid Email or Password")
    }
})

const allUsers = asyncHandler(async (req, res) => {
    const keywords = req.query.search ? {
        $or: [
            {name: {$regex: req.query.search, $options: "i"}},
            {email:{$regex: req.query.search, $options: "i"}},
        ]
    }:{};


    const user  = await User.find(keywords).find({_id: {$ne : req.user._id}});
    res.send(user);
});



module.exports = {registerUser, authUser,allUsers}