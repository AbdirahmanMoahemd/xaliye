import express from "express";
import {
  createTask,
  createTaskExsting,
  deleteTaskById,
  getTaskById,
  getTasks,
  getTasksByPhone,
  getTasksByRange,
  getTasksByRecent,
  getTasksByThisWeek,
  getTasksInBin,
  getTotalTasks,
  moveTaskstoBin,
  restoreTasks,
  updateTasks,
  updateTasksStage,
  updateTasksStatus,
} from "../controllers/tasksControllers.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getTasks).post(protect, createTask);
router.route("/range/tasks").post(protect, getTasksByRange);
router.route("/recent/tasks").get(protect, getTasksByRecent);
router.route("/this/week").get(protect, getTasksByThisWeek);
router.route("/total/taskts").get(getTotalTasks);
router.route("/taskslist/byphone").get(getTasksByPhone);
router.route("/existing").post(protect, createTaskExsting);
router
  .route("/:id")
  .put(protect, updateTasks)
  .get(protect, getTaskById)
  .delete(protect, admin, deleteTaskById);
router.route("/bin/:id").put(moveTaskstoBin);
router.route("/restore/:id").put(protect, restoreTasks);
router.route("/stage/:id").put(protect, updateTasksStage);
router.route("/status/:id").put(protect, updateTasksStatus);
router.route("/bin/list").get(protect, getTasksInBin);

export default router;
