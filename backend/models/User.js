import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import crypto from "crypto";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      min: [5, "Length should be greater than 5"],
      max: [20, "Length should be smaller than 20"],
    },
    lastName: {
      type: String,
      required: true,
      unique: true,
      min: [5, "Length should be greater than 5"],
      max: [20, "Length should be smaller than 20"],
    },
    email: {
      type: String,
      required: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: true,
      min: [5, "Length should be greater than 5"],
      select: false,
    },
    phoneNumber: {
      type: String,
      required: true,
      min: [10, "Length should be equal to 10"],
      select: false,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    history: [
      {
        bookingHist: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "History",
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export const User = mongoose.model("User", UserSchema);
