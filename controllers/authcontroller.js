import { register } from "../schemas/auth.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_KEY
//----------------------------------------------register-api-----------------------------------//
export const authregister = async (req, res) => {
  const { name, email, password, cnf_password } = req.body;

  if (!name || !email || !password || !cnf_password) {
    console.log(name,email,password,cnf_password);
    return res.status(400).json({ status:400,message: "All fields are required" });
  }

  if (password !== cnf_password) {
    return res.status(400).json({status:400, message: "Passwords do not match" });
  }

  try {
    const existingUser = await register.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ status:400,message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new register({
      name,
      email,
      password: hashedPassword,
      cnf_password:hashedPassword,
      isLoggedIn: false,
      
    });

    await newUser.save();
    return res.status(201).json({ status:201,message: "User registered successfully" });
  } catch (error) {
    return res.status(500).json({ status:500,message: "User registration failed", error: error.message });
  }
};


//----------------------------------------------login-api-----------------------------------//

export const authLogin = async  (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
try {
  const user = await register.findOne({ email });
  if(!user){
    return res.status(404).json({ status:404,message: "User not found" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if(!isMatch){
    return res.status(400).json({ status:400,message: "Invalid credentials" });
  } 
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
  console.log('token: ', token);
  if(isMatch && user){
    return res.status(200).json({ status:200,message: "Login successful", token, user: { id: user._id, name: user.name, email: user.email } });
  }
} catch (error) {
  console.log('error: ', error);
  return res.status(500).json({ status:500,message: "User login failed vijay", error: error.message });
}
};

export const authlogout = async (req,res)=>{
  try{
    const userId = req.user;
    console.log('userId: ', userId);
    // console.log('userId: ', userId);
    // await register.findByIdAndUpdate(userId, { isLoggedIn: false });
    // return res.status(200).json({ status:200,message: "User logged out successfully" });
  }
  catch(error){
    return res.status(500).json({ status:500,message: "User logout failed", error: error.message });
  }
}
