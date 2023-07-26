import express from "express";
import { admin, protect } from "../middlewares/authMiddleware.js";
import {
  createExSalesItem,
  createSalesItem,
  deleteSalesItemById,
  getPaidSalesItems,
  getRecentSales,
  getSalesById,
  getSalesIByDateRange,
  getSalesItems,
  getTotalSales,
  getUnPaidSalesItems,
  updateSalesBillingItem,
  updateSalesItem,
} from "../controllers/sales2Controller.js";

const router = express.Router();

router.route("/").get(protect, getSalesItems).post(protect, createSalesItem);
router.route('/existing').post(protect, createExSalesItem)
router.route('/date/range').post(protect, getSalesIByDateRange)
router.route('/recent/sales').get(protect, getRecentSales)
router.route('/sale/billing/:id').put(updateSalesBillingItem)
router.route('/unpaid/sales').get(protect, getUnPaidSalesItems)
router.route('/paid/sales').get(protect, getPaidSalesItems)
router.route('/total/sales').get(getTotalSales)
router
  .route("/:id")
  .get(protect, getSalesById)
  .put(protect, updateSalesItem)
  .delete(protect, admin, deleteSalesItemById);

export default router;
