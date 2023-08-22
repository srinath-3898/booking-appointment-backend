const express = require("express");
const cors = require("cors");
const sequelize = require("./configs/databaseConfig");
const User = require("./models/userModel");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/user", require("./routes/userRoutes"));

User.sync()
  .then(() => console.log("User model synced"))
  .catch((err) => console.log(err));

sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
    return app.listen(8080);
  })
  .then(() => console.log("Server running on port 8080"))
  .catch((error) => console.log(error));
