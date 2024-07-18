import { catchAsyncError } from "../utils/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { TrainRoute } from "../models/TrainRoutes.js";

export const getTrainRouteData = catchAsyncError(async (req, res, next) => {
  const keyword = req.query.keyword || "";


  const trainRoutes = await TrainRoute.find({
    train_name: {
      $regex: keyword,
      $options: "i",
    },
  });
  res.status(200).json({
    success: true,
    trainRoutes,
  });
});

export const getSingleTrainRouteData = catchAsyncError(
  async (req, res, next) => {
    const trainRoute = await TrainRoute.findById(req.params.id);
    if (!trainRoute) {
      return next(new ErrorHandler("Invalid Course id", 404));
    }

    res.status(200).json({
      success: true,
      trainRoute,
    });
  }
);
