import express from "express";
import { admin, protect } from "../middlewares/authMiddleware.js";
import {
  createCustomers,
  deleteCustomersById,
  getCustomers,
  getCustomersBYDateRage,
  getCustomersById,
  getTasksCustomersById,
  getTasksCustomersByName,
  getTotalCustomersAndSales,
  updateCustomers,
} from "../controllers/customersController.js";

const router = express.Router();

router.route("/").get(protect, getCustomers).post(protect, createCustomers);
router.route('/date/range').post(protect, getCustomersBYDateRage)
router.route('/total/customer').get(getTotalCustomersAndSales)
router.route("/byname/:name").get(getTasksCustomersByName)
router.route("/mytasks/:id").get(protect, getTasksCustomersById);
router
  .route("/:id")
  .get(protect, getCustomersById)
  .put(protect, updateCustomers)
  .delete(protect, admin, deleteCustomersById);

export default router;
