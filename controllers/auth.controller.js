const SellerModel = require("../models/seller");
const UserModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')



module.exports.createAccountController = async (req, res, next) => {
  try {
    const user = req.body;
    const { username, email, password, role } = user;
    if (
      (await UserModel.findOne({ email })) ||
      (await SellerModel.findOne({ email }))
    ) {
      return res.status(400).json({
        status: "fail",
        message: "email already exists",
      });
    }
    if (role === "user") {
      // check for username availability
      if (await UserModel.findOne({ username })) {
        return res.status(400).json({
          status: "fail",
          message: "username already exists",
        });
      }

      // if both passed create a user
      const newUser = await UserModel.create(user);
      console.log('new user from "user role", after creating', newUser);
      newUser.password = await bcrypt.hashSync(password);
      const savedUser = await newUser.save({ runValidation: false });
      console.log("after saving user", savedUser);
      // now send a response
      return res.status(200).json({
        status: "success",
        message: "user account created",
        id: savedUser._id,
      });
    }
    if (role === "seller") {
      // check for username availability

      if (await SellerModel.findOne({ username })) {
        return res.status(400).json({
          status: "fail",
          message: "username already exists",
        });
      }
      // if both passed create a user
      const newSeller = await SellerModel.create(user);
      console.log('new user from "user role", after creating', newSeller);
      newSeller.password = await bcrypt.hashSync(password);
      const savedUser = await newSeller.save({ runValidation: false });
      console.log("after saving user", savedUser);
      // now send a response
      return res.status(200).json({
        status: "success",
        message: "seller account created",
        id: savedUser._id,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error?.message,
    });
  }
};

module.exports.loginController = async (req, res, next) => {
  try {
    const loginData = req.body;
    const { email, password , role} = loginData;
    console.log(loginData)
    if(!email || !password || !role){
        return res.status(400).json({
            status:'fail',
            message:'please provide all credentials'
        })
    }
    // handle user log in
    if(role === 'user' ){
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(400).json({
                status:'fail',
                message:'User not found'
            })
        }
        const isPasswordValid = async()=> {
            return await bcrypt.compareSync(password, user.password);
        }

        if(!isPasswordValid){
            return res.status(400).json({
                status:'fail',
                message:'Provide correct credentials'
            })
        }
        const payload = {
            username:user.username,
            email,
            role,
            id:user._id
        }
        // create an accesstoken with jwt
        const accessToken = await jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:'2 days'});
        console.log(accessToken)
        return res.status(200).json({
            status:'success',
            message:'log in successful',
            user:payload,
            accessToken
        })

    }
    if(role === 'seller' ){
        const user = await SellerModel.findOne({email});
        if(!user){
            return res.status(400).json({
                status:'fail',
                message:'seller not found'
            })
        }
        const isPasswordValid = async()=> {
            return await bcrypt.compareSync(password, user.password);
        }

        if(!isPasswordValid){
            return res.status(400).json({
                status:'fail',
                message:'Provide correct credentials'
            })
        }
        const payload = {
            username:user.username,
            email,
            role,
            id:user._id
        }
        // create an accesstoken with jwt
        const accessToken = await jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:'2 days'});
        console.log(accessToken)
        return res.status(200).json({
            status:'success',
            message:'log in successful',
            user:payload,
            accessToken
        })

    }
  } catch (error) {
    return res.status(500).json({
        status:'fail',
        message:"internal server error"
    })
  }
};
