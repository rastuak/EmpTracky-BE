const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const cookieParser = require("cookie-parser");

const usersRoute = require("./routes/users.route");
const employeeRoute = require("./routes/employee.route");

dotenv.config();

const port = 8000;
const app = express();

const cors = require("cors");

app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true,
}));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/users", usersRoute);
app.use("/employee", employeeRoute);

app.listen(port, () => {
  console.log(`Running on port ${port}!`);
});
