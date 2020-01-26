import express from "express";
import { createEmployee, getAllEmployee } from "controller/employeeController";

const router = express.Router();

router
  .route("/")
  .post(createEmployee)
  .get(getAllEmployee);

export default router;
