const express = require("express");

const server = express();

// middleware
server.use(express.json());

let users = [
  {
    name: "test",
    bio: "test bio",
    id: 0,
  },
];

// endpoints
server.post("/api/users", (req, res) => {
  const user = req.body;
  if (user.name === "" || user.bio === "") {
    res
      .status(400)
      .json({ errorMessage: "Please provide a name and bio for the user" });
  } else {
    users.push(user);
    res.status(201).json(user);
  }
  if (!user) {
    res.status(500).json({
      errorMessage: "There was an error while saving the user to the database ",
    });
  }
});

server.get("/api/users", (req, res) => {
  users
    ? res.status(200).json(users)
    : res.status(500).json({
        errorMessage: "The users insformation could not be retrieved",
      });
});

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;

  const user = users.find((e) => e.id == id);

  user
    ? res.json(user)
    : res
        .status(404)
        .json({ message: "The user with the specified ID does not exist" });
});

server.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = users.find((e) => e.id == id);
  users = users.filter((e) => Number(e.id) !== id);

  user
    ? res.status(200).json(users)
    : res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
});

const port = 5001;
server.listen(port, () =>
  console.log(`\n\n*** api running on port ${port} *** \n\n`)
);