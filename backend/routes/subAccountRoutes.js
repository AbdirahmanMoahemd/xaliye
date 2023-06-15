import express from "express";
import {
  createSubAccount,
  deleteSubAccountById,
  getSubAccountById,
  getSubAccounts,
  updateSubAccount,
} from "../controllers/subAccountController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getSubAccounts).post(protect, createSubAccount);
router
  .route("/:id")
  .get(protect, getSubAccountById)
  .put(protect, updateSubAccount)
  .delete(protect, admin, deleteSubAccountById);

export default router;
