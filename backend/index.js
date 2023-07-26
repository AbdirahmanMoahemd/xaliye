import express from "express";
import path from "path";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "../backend/routes/userRoutes.js";
import tasksRoutes from "../backend/routes/tasksRoutes.js";
import storeRoutes from "../backend/routes/storeRoutes.js";
import customerRoutes from "../backend/routes/customerRoutes.js";
import salesRoute from "../backend/routes/salesRoute.js";
import accountRoutes from "../backend/routes/accountRoutes.js";
import subAccountRoutes from "../backend/routes/subAccountRoutes.js";
import transactionRoutes from "../backend/routes/transactionRoutes.js";
import eventsRouets from "../backend/routes/eventsRouets.js";
import store2Routes from "../backend/routes/store2Routes.js";
import sales2Routes from "../backend/routes/sales2Routes.js";
import customer2Routes from "../backend/routes/customer2Routes.js";
import { errorHandler, notFound } from "./middlewares/errorMidlleware.js";

dotenv.config(); 
connectDB();
const app = express();

if (process.env.NODE_ENV === "Development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/store", storeRoutes);  
app.use("/api/store2", store2Routes);  
app.use("/api/customers", customerRoutes);
app.use("/api/customers2", customer2Routes);
app.use("/api/Sales", salesRoute);
app.use("/api/Sales2", sales2Routes);
app.use("/api/account", accountRoutes); 
app.use("/api/subaccount", subAccountRoutes);
app.use("/api/transaction", transactionRoutes);
app.use("/api/events", eventsRouets);
// app.use('/api/upload', uploadRoutes)





const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is runnin...");
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
