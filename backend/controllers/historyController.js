import { catchAsyncError } from "../utils/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { TrainRoute } from "../models/TrainRoutes.js";
import { History } from "../models/History.js";
import { User } from "../models/User.js";

export const insertHistory = catchAsyncError(async (req, res, next) => {
  const { userId, trainId, passengers, isPaymentDone, totalAmount } = req.body;   
  if (!userId || !trainId) {
    return next(new ErrorHandler("User ID and Train ID are required", 400));
  }

  try {
   
    const trainRoute = await TrainRoute.findById(trainId);

    if (!trainRoute) {
      return next(new ErrorHandler("Train route not found", 404));
    }

    
    const newHistory = new History({
      user: userId, 
      train: trainRoute._id, 
      train_id: trainRoute.train_id,
      bookedAt: new Date(),
      passengers,
      isPaymentDone,
      totalAmount,
    });

    await newHistory.save();

  
    await User.findByIdAndUpdate(
      userId,
      { $push: { history: { bookingHist: newHistory._id } } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "History inserted and User updated successfully",
      data: newHistory,
    });
  } catch (error) {
    
    return next(new ErrorHandler(error.message, 500));
  }
});


export const getHistory = catchAsyncError(async (req, res, next) => {
  const {userId} = req.body;

  const userHistory = await History.find({ user: userId }).populate('train');

  if (!userHistory) {
    return next(new ErrorHandler("No history found for the user", 404));
  }

  res.status(200).json({
    success: true,
     userHistory
  });
});


export const updateHistory = catchAsyncError(async (req, res, next) => {
  const { userId, objectId } = req.body;

  try {
    const updatedHistory = await History.updateMany(
      { user: userId, _id: objectId },
      { $set: { isPaymentDone: false } }
    );

    if (updatedHistory.nModified === 0) {
      return next(new ErrorHandler("Failed to update history or no matching record found", 400));
    }

    const userHistory = await History.find({ user: userId, _id: objectId }).populate('train');

    res.status(200).json({
      success: true,
      data: userHistory,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});