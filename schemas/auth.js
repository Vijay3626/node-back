import { model, Schema } from "mongoose";

const registerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cnf_password: {
    type: String,
    required: true,
  },
  isLoggedIn: {
    type: Boolean,
    default: false,
  },
});

export const register = model("register", registerSchema);

const loginSchema = new Schema({
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
});
export const login = model("login", loginSchema);
