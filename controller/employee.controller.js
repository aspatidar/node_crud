const { Employee } = require("../model");
const { User } = require("../model");

// Get all employees
const handleGetAllEmployee = async (req, res) => {
  const query = req.query;
  const offset = query.page ? (query.page - 1) * query.limit : 0;
  const limit = query.limit ? query.limit : 10;

  const results = await Employee.findAll(
    {
      limit: limit,
      offset: offset,
    },
  );
  res
    .status(200)
    .json({ msg: "Successfully fetched all employess", employees: results });
};

// Create employee
const handlePostEmployee = async (req, res) => {
  const { first_name, last_name, designation, group, employee_id } = req.body;
  const result = await Employee.create({
    first_name: first_name,
    last_name: last_name,
    designation: designation,
    group: group,
    employee_id: employee_id,
  });
  res.status(200).json({ msg: "Success", employee: result });
};
// Update employee by id
const handleUpdateEmployeeById = async (req, res) => {
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
const handleGetEmployeeById = async (req, res) => {
  const result = await Employee.findByPk(req.params.id);
  res
    .status(200)
    .json({ msg: "Successfully find employee details", employee: result });
};
// Delete employee by id
const handleDeleteEmployeeById = async (req, res) => {
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
  handlePostEmployee,
  handleGetAllEmployee,
  handleUpdateEmployeeById,
  handleGetEmployeeById,
  handleDeleteEmployeeById,
};
