import express from "express";
import { admin, protect } from "../middlewares/authMiddleware.js";
import {
  createSalesItem,
  deleteSalesItemById,
  getPaidSalesItems,
  getRecentSales,
  getSalesById,
  getSalesItems,
  getUnPaidSalesItems,
  updateSalesBillingItem,
  updateSalesItem,
} from "../controllers/salesController.js";

const router = express.Router();

router.route("/").get(protect, getSalesItems).post(protect, createSalesItem);
router.route('/recent/sales').get(protect, getRecentSales)
router.route('/sale/billing/:id').put(updateSalesBillingItem)
router.route('/unpaid/sales').get(protect, getUnPaidSalesItems)
router.route('/paid/sales').get(protect, getPaidSalesItems)
router
  .route("/:id")
  .get(protect, getSalesById)
  .put(protect, updateSalesItem)
  .delete(protect, admin, deleteSalesItemById);

export default router;
