const bcrypt = require('bcrypt');
const pg = require("../utils/connect");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userResult = await pg.query('SELECT * FROM users WHERE username = $1 OR email = $2', [username, email]);
    if (userResult.rows.length > 0) {
      return res.status(300).json({  msg: 'Username or email already exists'  });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUserResult = await pg.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, hashedPassword]
    );
    res.status(201).json(newUserResult.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userResult = await pg.query('SELECT * FROM users WHERE username = $1', [username]);
    if (userResult.rows.length === 0) {
      return res.status(300).json({ msg: 'Username not registered' });
    }
    const user = userResult.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(301).json({ msg: 'Invalid credentials' });
    }
    res.cookie('uuid', user.id)
    res.status(201).json({
      data: {
        id: user.id,
        username: user.username,
        password: user.password
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.logout = (req,res) => {
  res.clearCookie('uuid');
  res.status(200).json({ msg: 'Logout success' });
}

exports.getProfile = async (req,res) => {
  try {
    const response = await pg.query('SELECT * FROM users WHERE id = $1', [req.params['uuid']]);
    if (response.rows.length === 0) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(200).json(response.rows[0]);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.editProfile = async (req, res) => {
  const userId = req.params.id;
  const { birth, company, division, position, phone, gender } = req.body;

  const response = await pg.query('UPDATE users SET birth = $1, company = $2, division = $3, position = $4, gender = $5, phone = $6 WHERE id = $7 RETURNING *', [birth, company, division, position, gender, phone, userId]);
  if (response.rows.length === 0) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json(response.rows[0]);
}