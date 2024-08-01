const express = require("express");
const employeeController = require("../controllers/employee.controller");
const router = express.Router();


router.post("/add", employeeController.addEmployee);
router.get("/get/:uuid", employeeController.getEmployees);
router.get("/:id", employeeController.getOneEmployee);
router.put("/:id", employeeController.editEmployee);
router.delete("/:id", employeeController.deleteEmployee);

module.exports = router;