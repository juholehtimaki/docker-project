const express = require("express");
const cors = require("cors");

const connectDb = require("./connection");
const User = require("./user-model");

const app = express();
app.use(cors());
app.use(express.json());

const port = 8000;

app.get("/users", async (req, res) => {
  console.log("getting users");
  User.find()
    .then((users) => res.json(users))
    .catch(() => res.sendStatus(500));
});

app.post("/users", async (req, res) => {
  console.log("posting a new user");
  const user = new User({ username: req.body.name });
  user
    .save()
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500));
});

app.delete("/users/:id", async (req, res) => {
  console.log("deleting an user");
  User.deleteOne({ _id: req.params.id })
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500));
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
  connectDb()
    .then(() => {
      console.log("connected to mongodb");
    })
    .catch(() => console.log("failed to connect to mongodb"));
});
