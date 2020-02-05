import express from "express";
import {
  createEmployee,
  getAllEmployee,
  deleteEmployee
} from "controller/employeeController";

const router = express.Router();

router
  .route("/")
  .post(createEmployee)
  .get(getAllEmployee);

router.delete("/:id", deleteEmployee);

export default router;
