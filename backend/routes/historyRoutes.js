import express from "express";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import { getHistory, insertHistory, updateHistory } from "../controllers/historyController.js";

const router = express.Router();

router.route("/insertHistory").post(isAuthenticated,insertHistory);
router.route("/getHistory").post(isAuthenticated,getHistory);
router.route("/updateHistory").put(isAuthenticated,updateHistory);




export default router;
