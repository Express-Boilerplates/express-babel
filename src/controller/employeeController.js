import Employee from "model/employeeModel";
import APIFeatures from "utils/ApiFeatures";
import { check, sanitize, validationResult } from "express-validator";

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
export const getAllEmployee = async (req, res, next) => {
  const features = new APIFeatures(Employee.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const employees = await features.query;
  res.json({
    data: employees
  });
};

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export const createEmployee = async (req, res, next) => {
  await check("email", "Email is not valid")
    .isEmail()
    .run(req);
  await check("name", "Name can not be empty")
    .isString()
    .run(req);
  await sanitize("email")
    .normalizeEmail({ gmail_remove_dots: false })
    .run(req);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() });
  }
  // const newEmployee = await Employee.create({
  //   name: req.body.name,
  //   phoneNumber: req.body.phoneNumber,
  //   email: req.body.email
  // });

  // return res.json({
  //   data: newEmployee
  // });
  return res.json({ ...req.body });
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
export const updateEmployee = async (req, res, next) => {
  const updatedEmployee = await Employee.findByIdAndUpdate(
    req.params?.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    data: updatedEmployee
  });
};
