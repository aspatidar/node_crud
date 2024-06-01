const { Employee } = require("../model/employee.model");

// Get all employees
handleGetAllEmployee = async (req, res) => {
  try {
    const results = await Employee.findAll();
    console.log("Employees", results);
    res
      .status(200)
      .json({ msg: "Successfully fetched all employess", employees: results });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Somthing is wrong" });
  }
};

// Create employee
handlPostEmployee = async (req, res) => {
  try {
    const body = req.body;
    const result = await Employee.create({
      first_name: body.first_name,
      last_name: body.last_name,
      designation: body.designation,
      group: body.group,
      employee_id: body.employee_id,
    });
    res.status(200).json({ msg: "Success", employee: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Somthing went wrong", error: error });
  }
};
// Update employee by id
handlUpdateEmployeeById = async (req, res) => {
  try {
    const result = await Employee.update(
      { ...req.body },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (result === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Employee not found",
      });
    } else {
      const employee = await Employee.findByPk(req.params.id);
      res.status(200).json({ msg: "Employee Updated", employee: employee });
    }
  } catch (error) {
    console.log("error ->", error);
    res.status(500).json({ msg: "Somthing went wrong", error: error });
  }
};
// Get employee by id
handleGetEmployeeById = async (req, res) => {
  try {
    const result = await Employee.findByPk(req.params.id);
    res
      .status(200)
      .json({ msg: "Successfully find employee details", employee: result });
  } catch (error) {
    res.status(500).json({ msg: "Somthing went wrong", error: error });
  }
};
// Delete employee by id
handlDeleteEmployeeById = async (req, res) => {
  try {
    const result = await Employee.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (result === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Employee not found",
      });
    } else {
      res.status(200).json({ msg: "Successfully deleted" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Somthing went wrong", error: error });
  }
};

module.exports = {
  handlPostEmployee,
  handleGetAllEmployee,
  handlUpdateEmployeeById,
  handleGetEmployeeById,
  handlDeleteEmployeeById,
};
