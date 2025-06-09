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

// ------------------------------------------------------------
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

// ------------------------------------------------------------

const userListSchema = new Schema({
  from: { type: Schema.Types.ObjectId, ref: "register", required: true },
  to: { type: Schema.Types.ObjectId, ref: "register", required: true },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
},{ timestamps: true });

export const userlist = model("userlist", userListSchema);