import express from "express";
import {
  deleteTrain,
  login,
  logout,
  register,
  updateTrain,
  insertTrain
} from "../controllers/userController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").get(logout);

// Admin Routes

router
  .route("/admin/train/:id")
  .put(isAuthenticated, authorizeAdmin, updateTrain)
  .delete(isAuthenticated, authorizeAdmin, deleteTrain);


  router
  .route("/admin/train")
  .post(isAuthenticated, authorizeAdmin, insertTrain)

export default router;
