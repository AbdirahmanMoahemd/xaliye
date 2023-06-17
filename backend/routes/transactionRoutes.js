import express from "express";

import {
  createTransaction,
  deleteTransactionsById,
  getTransactionById,
  getTransactions,
  getTransactionsByDateRage,
  updateTransactions,
} from "../controllers/transactionsController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(protect, getTransactions)
  .post(protect, createTransaction);

router.route('/date/range').post(protect, getTransactionsByDateRage)

router
  .route("/:id")
  .get(protect, getTransactionById)
  .put(protect, updateTransactions)
  .delete(protect, admin, deleteTransactionsById);

export default router;
