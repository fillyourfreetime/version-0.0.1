const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors({
  origin: 'https://fillyourfreetime.com'
}));

const db = require("./models");

app.use(express.static("images"));

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

const postsRouter = require("./routes/posts");
app.use("/posts", postsRouter);

const commentsRouter = require("./routes/comments");
app.use("/comments", commentsRouter);

const securityRouter = require("./routes/security");
app.use("/security", securityRouter);

app.use('/images', express.static('images'))

db.sequelize.sync().then(() => {
  app.listen(3001, () => {  
    console.log("server up on port 3001");
  });
});
