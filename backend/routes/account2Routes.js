import express from "express";
import {
  createAccount,
  deleteAccountById,
  getAccountById,
  getAccounts,
  updateAccount,
} from "../controllers/account2Controller.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getAccounts).post(protect, createAccount);

router
  .route("/:id")
  .get(protect, getAccountById)
  .put(protect, updateAccount)
  .delete(protect, admin, deleteAccountById);

export default router;
