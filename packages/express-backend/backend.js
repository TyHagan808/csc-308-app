// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8001;

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

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


// Getting Users:
const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

  app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

const findUsersByNameAndJob = (name, job) => {
  return users.users_list.filter(
    (user) => user.name === name && user.job === job
  );
};

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  if (name && job) {
    const result = findUsersByNameAndJob(name, job);
    res.send({ users_list: result });
  } else if (name) {
    const result = findUserByName(name);
    res.send({ users_list: result });
  } else {
    res.send(users);
  }
});


// Adding Users:
const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;

  // assign an id on the server
  const id = generateId();
  const newUser = { ...userToAdd, id };

  users.users_list.push(newUser);

  // return 201
  res.status(201).send(newUser);
});

const generateId = () => Math.random().toString(36).slice(2, 9);

// Delete Users:
const deleteUserById = (id) => {
  const index = users.users_list.findIndex(
    (user) => user.id === id
  );

  if (index === -1) {
    return false;
  }

  users.users_list.splice(index, 1);
  return true;
};

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const index = users.users_list.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).send("Resource not found.");
  }

  users.users_list.splice(index, 1);
  return res.status(204).send();
});
