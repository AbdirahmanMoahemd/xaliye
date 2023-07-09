import express from "express";
import {
  createTask,
  createTaskExsting,
  deleteTaskById,
  getFinishedTasks,
  getFinishedTasksByRecent,
  getOnProcessTasks,
  getOnProcessTasksByRecent,
  getTaskById,
  getTasks,
  getTasksByPhone,
  getTasksByRange,
  getTasksByRecent,
  getTasksByThisWeek,
  getTasksInBin,
  getTotalTasks,
  getUnFinishedTasks,
  getUnFinishedTasksByRecent,
  moveTaskstoBin,
  restoreTasks,
  updateTasks,
  updateTasksStage,
  updateTasksStatus,
} from "../controllers/tasksControllers.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getTasks).post(createTask);
router.route("/range/tasks").post(protect, getTasksByRange);
router.route("/recent/tasks").get(protect, getTasksByRecent);
router.route("/this/week").get(protect, getTasksByThisWeek);
router.route("/total/taskts").get(getTotalTasks);
router.route("/taskslist/byphone").get(getTasksByPhone);
router.route("/existing").post(protect, createTaskExsting);
router.route('/onprecess/list').get(protect, getOnProcessTasks)
router.route('/finished/list').get(protect, getFinishedTasks)
router.route('/unfinished/list').get(protect, getUnFinishedTasks)

router.route('/onprecess/recentlist').get(protect, getOnProcessTasksByRecent)
router.route('/finished/recentlist').get(protect, getFinishedTasksByRecent)
router.route('/unfinished/recentlist').get(protect, getUnFinishedTasksByRecent)
router
  .route("/:id")
  .put(protect, updateTasks)
  .get(protect, getTaskById)
  .delete(protect, admin, deleteTaskById);
router.route("/bin/:id").put(protect, moveTaskstoBin);
router.route("/restore/:id").put(protect, restoreTasks);
router.route("/stage/:id").put(protect, updateTasksStage);
router.route("/status/:id").put(protect, updateTasksStatus);
router.route("/bin/list").get(protect, getTasksInBin);

export default router;
