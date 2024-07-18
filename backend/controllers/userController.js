import { catchAsyncError } from "../utils/catchAsyncError.js";
import { User } from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { TrainRoute } from "../models/TrainRoutes.js";

export const register = catchAsyncError(async (req, res, next) => {
  const { name, lastName, email, password, phoneNumber } = req.body;

  if (!name || !email || !password) {
    return next(new ErrorHandler("Please add all fields", 400));
  }
  const oldUser = await User.findOne({
    email,
  });
  if (oldUser) {
    return next(new ErrorHandler("User is already signup", 409));
  }

  const newUser = await User.create({
    name,
    email,
    password,
    lastName,
    phoneNumber,
  });

  const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  const options = {
    expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  };

  res.status(201).cookie("token", token, options).json({
    success: true,
    message: "Registered Successfully",
    user: newUser,
  });
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    return next(new ErrorHandler("Please add all fields", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  const options = {
    expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  };
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return next(new ErrorHandler("Incorrect Email or Password", 401));

  if (user && isMatch) {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });
    res.status(200).cookie("token", token, options).json({
      success: true,
      message: "Login Successfully",
      user: user,
    });
  }
});

export const logout = catchAsyncError(async (req, res, next) => {
  const options = {
    expires: new Date(Date.now()),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };

  res.status(200).cookie("token", null, options).json({
    success: true,
    message: "Logged Out Successfully",
  });
});

//ADMIN CONTROLLERS
export const deleteTrain = catchAsyncError(async (req, res, next) => {
  const trainId = req.params.id;

  const train = await TrainRoute.findById(trainId);


  if (!train) {
    return next(new ErrorHandler("Train not found", 404));
  }
  await TrainRoute.deleteOne({ _id: trainId });
  res.status(200).json({
    success: true,
    message: "Train deleted successfully",
  });
});

export const updateTrain = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  let train = await TrainRoute.findById(id);

  if (!train) {
    return next(new ErrorHandler("Train not found", 404));
  }
  const {
    train_name,
    train_id,
    origin,
    destination,
    distance_km,
    ticket_price,
    departure_time,
    arrival_time,
  } = req.body;

  train.train_name = train_name || train.train_name;
  train.train_id = train_id || train.train_id;
  train.origin = origin || train.origin;
  train.destination = destination || train.destination;
  train.distance_km = distance_km || train.distance_km;
  train.ticket_price = ticket_price || train.ticket_price;
  train.departure_time = departure_time || train.departure_time;
  train.arrival_time = arrival_time || train.arrival_time;

  await train.save();

  res.status(200).json({
    success: true,
    message: "Train details updated successfully",
    train,
  });
});

export const insertTrain = catchAsyncError(async (req, res, next) => {
  const {
    train_name,
    train_id,
    origin,
    destination,
    distance_km,
    ticket_price,
    departure_time,
    arrival_time,
  } = req.body;

  if (
    !train_name ||
    !train_id ||
    !origin ||
    !destination ||
    !distance_km ||
    !ticket_price ||
    !departure_time ||
    !arrival_time
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const newTrainRoute = new TrainRoute({
    train_name,
    train_id:Number(train_id),
    origin,
    destination,
    distance_km,
    ticket_price,
    departure_time,
    arrival_time,
  });

  await newTrainRoute.save();

  res.status(201).json({
    success: true,
    message: "Train route created successfully",
  });
});
