import express from "express";
import { admin, protect } from "../middlewares/authMiddleware.js";
import {
  createStoreItem,
  deleteStoreItemById,
  getStoreItemById,
  getStoreItems,
  updateStoreItem,
  updateStoreItemCountStck,
} from "../controllers/storeController.js";

const router = express.Router();

router.route("/").get(protect, getStoreItems).post(protect, createStoreItem);
router.route('/count/:id').put(protect, updateStoreItemCountStck)
router
  .route("/:id")
  .get(protect, getStoreItemById)
  .put(protect, updateStoreItem)
  .delete(protect, admin, deleteStoreItemById);

  export default router
