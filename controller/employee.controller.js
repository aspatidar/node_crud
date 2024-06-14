const { Employee } = require("../model/employee.model");

// Get all employees
handleGetAllEmployee = async (req, res) => {
    const results = await Employee.findAll();
    console.log("Employees", results);
    res
      .status(200)
      .json({ msg: "Successfully fetched all employess", employees: results });
};

// Create employee
handlPostEmployee = async (req, res) => {
    const body = req.body;
    const result = await Employee.create({
      first_name: body.first_name,
      last_name: body.last_name,
      designation: body.designation,
      group: body.group,
      employee_id: body.employee_id,
    });
    res.status(200).json({ msg: "Success", employee: result });
};
// Update employee by id
handlUpdateEmployeeById = async (req, res) => {
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
};
// Get employee by id
handleGetEmployeeById = async (req, res) => {
    const result = await Employee.findByPk(req.params.id);
    res
      .status(200)
      .json({ msg: "Successfully find employee details", employee: result });
};
// Delete employee by id
handlDeleteEmployeeById = async (req, res) => {
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
};

module.exports = {
  handlPostEmployee,
  handleGetAllEmployee,
  handlUpdateEmployeeById,
  handleGetEmployeeById,
  handlDeleteEmployeeById,
};
