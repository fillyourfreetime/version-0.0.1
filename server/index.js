const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("server up on port 3001");
  });
});
