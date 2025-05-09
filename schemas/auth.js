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
});

export const register = model("register", registerSchema);
