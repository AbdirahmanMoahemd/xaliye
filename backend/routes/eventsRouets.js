import express from "express";
import { protect, admin } from "../middlewares/authMiddleware.js";
import { getEvents } from "../controllers/eventsController.js";

const router = express.Router();

router.route("/").get(protect,admin, getEvents)



export default router;