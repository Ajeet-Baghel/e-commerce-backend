const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    contact: {
      type: Number,
      required: function () {
        return this.authProvider === "local";
      },
      unique: true,
      sparse: true,
    },
    password: {
      type: String,
      required: function () {
        return this.authProvider === "local";
      },
      trim: true,
    },
    address: {
      type: String,
      required: function () {
        return this.authProvider === "local";
      },
      trim: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
      required: function () {
        return this.authProvider === "local";
      },
      trim: true,
      lowercase: true,
    },
    age: {
      type: Number,
      required: function () {
        return this.authProvider === "local";
      },
    },
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("user", userSchema);
