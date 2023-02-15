const user_model=require("../model/user_model");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

exports.signup=async(req,res)=>{

  try{
    if(!req.body.email ||!req.body.password ||!req.body.name){
      res.status(400).json({success:false,message:"Please enter all the fields"});
      return;
    }
    const existingUser=await user_model.findOne({email:req.body.email});

    if(existingUser){
      res.status(400).json({success:false,message:"User already exists"});
      return;
    }
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(req.body.password,salt);
    const data= {...req.body,password:hashedPassword};

    const newUser=await user_model.create(data);

    const token= await jwt.sign({existingUser},"fake-jwt-secret");

    return res.status(201).json({
      success:true,
      message:"User Created Successfully",
      data:{
        id:newUser.id,
        name:newUser.name,
        email:newUser.email,
        access_token:token,
      },
    });
  }catch(err){
    return res.status(404).json({ success: false , message: "Something Went Wrong !", data: err});
  }
};

exports.login=async(req,res)=>{

  try{
    if(!req.body.email ||!req.body.password){
      return res.status(400).json({success:false,message:"Please enter all the necessary information to login"});
    }
    const user= await user_model.findOne({email:req.body.email});

    if(!user){
      return res.status(404).json({success:false,message:"User not found"});
    }

    if(!await bcrypt.compare(req.body.password,user.password)){
      return res.status(404).json({success:false,message:"Incorrect Password"});
    }

    const token= await jwt.sign({user},"fake-jwt-secret");

    return res.status(200).json({
      success:true,
      message:"Login Successful",
      data:{
        id:user.id,
        name:user.name,
        email:user.email,
        access_token:token,
      }
    });

  }catch(err){
    return res.status(404).json({ success: false, message: "Something Went Wrong!", data: err});
  }
}