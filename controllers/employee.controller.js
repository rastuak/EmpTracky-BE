const pg = require("../utils/connect");

exports.addEmployee = async function addEmployee(req, res) {
  try {
    const { uuid, name, division, position, gender, birth, salary, contract, phone } = req.body;
    const response = await pg.query(
      "INSERT INTO employee ( user_id, name, division, position, gender, birth, salary, contract, phone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [uuid, name, division, position, gender, birth, salary, contract, phone]
    );
    res.status(201).json(response.rows[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getEmployees = async function getEmployee(req, res) {
  const uuid = req.params.uuid;
  try {
    const response = await pg.query("SELECT * from employee WHERE user_id = $1", [uuid]);
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getOneEmployee = async (req, res) => {
  try {
    const response = await pg.query('SELECT * FROM employee WHERE id = $1', [req.params['id']]);
    if (response.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(response.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.editEmployee = async (req, res) => {
  const employeeId = req.params.id;
  const { birth, division, position, salary, contract } = req.body;

  const response = await pg.query('UPDATE employee SET birth = $1, division = $2, position = $3, salary = $4, contract = $5 WHERE id = $6 RETURNING *', [birth, division, position, salary, contract, employeeId]);
  if (response.rows.length === 0) {
    return res.status(404).json({ message: 'Employee not found' });
  }
  res.status(200).json(response.rows[0]);
}

exports.deleteEmployee = async (req, res) => {
  const employeeId = req.params.id;

  const response = await pg.query('DELETE FROM employee WHERE id = $1 RETURNING *', [employeeId]);
  if (response.rows.length === 0) {
    return res.status(404).json({ message: 'Employee not found' });
  }
  res.status(200).json({ message: 'Employee deleted successfully' });
}