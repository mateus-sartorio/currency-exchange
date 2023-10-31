import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please provide a first name"],
  },
  lastname: {
    type: String,
    required: [true, "Please provide an lastname"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Please provide an username"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  referenceCurrency: {
    type: String,
    default: "USD",
  },
  favoriteCurrencies: {
    type: [{ type: String }],
    default: ["EUR"],
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiration: Date,
  verifyToken: String,
  verifyTokenExpiration: String,
});

const User = mongoose.models.user || mongoose.model("users", userSchema);

export default User;
