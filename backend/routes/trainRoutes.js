import express from "express";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import { getSingleTrainRouteData, getTrainRouteData } from "../controllers/trainController.js";

const router = express.Router();

router.route("/getAllTrainRoutes").get(isAuthenticated,getTrainRouteData);

router.route("/getSingleTrainRouteData/:id").get(isAuthenticated,getSingleTrainRouteData);




export default router;
