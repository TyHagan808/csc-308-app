// backend.js
import express from "express";
import cors from "cors";

import User from "./user.js"
import userServices from "./user-services.js";

const app = express();
const port = 8001;

app.use(express.json());
app.use(cors());
 
app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});


app.get("/", (req, res) => {
  res.send("hello world!");
});

// Get all users
app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  userServices
    .getUsers(name, job)
    .then((users) => res.send({ users_list: users }))
    .catch((error) => res.status(500).send(error.message));
});

// Get by id, job, or both
app.get("/users/:id", (req, res) => {
  userServices
    .findUserById(req.params.id)
    .then((user) => {
      if (!user) return res.status(404).send("Resource not found.");
      res.send(user);
    })
    .catch((error) => res.status(500).send(error.message));
});

// Posting Users:
app.post("/users", (req, res) => {
  userServices
    .addUser(req.body)
    .then((createdUser) => res.status(201).send(createdUser))
    .catch((error) => res.status(500).send(error.message));
});

app.delete("/users/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((deletedUsr) => {
      if(!deletedUsr) return res.status(404).send("User not found.")
      res.status(204);
    })
    .catch((error) => res.status(500).send(error.message));
});
