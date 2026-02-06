// backend.js
import express from "express";
import cors from "cors";
import User from "./user.js";

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

// Get by id
app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  
  User.findById(id)
    .then((user) => {
      if (!user) return res.status(404).send("Resource not found.");
      res.send(user);
    })
    .catch((error) => res.status(500).send(error.status));
});

// Get all users
app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  let query = {};

  if (name) query.name = name;
  if (job) query.job = job;
  
  User.find(query)
    .then((users) => res.send({ users_list: users }))
    .catch((error) => res.status(500).send(error.status));
});

// Posting Users:
app.post("/users", (req, res) => {
  User.create(req.body)
    .then((createdUser) => res.status(201).send(createdUser))
    .catch((error) => res.status(500).send(error.status));
});

app.delete("/users/:id", (req, res) => {
  User.findByIdAndDelete(req.id)
    .then((deletedUsr) => {
      if(!deletedUsr) return res.status(404).send("User not found.")
      res.status(204);
    })
    .catch((error) => res.status(500).send(error.status));
});
