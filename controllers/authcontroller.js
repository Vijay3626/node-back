import { register } from "../schemas/auth.js";

export const authLogin = (req, res) => {
  res.send("Login route");
};
export const authregister = async (req, res) => {
    const { name, email, password, cnf_password } = req.body;
    if (!name && !email && !password && !cnf_password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password !== cnf_password) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    try {
      const existingUser = await register.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      const newUser = new register({ name, email, password, cnf_password });
      await newUser.save();
      return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      return res.status(500).json({ message: "User registration failed", error: error.message });
    }
  };
  
