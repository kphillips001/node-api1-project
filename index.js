const express = require("express");

const server = express();

// middleware
server.use(express.json());

let users = [
  {
    name: "Kevin",
    bio: "My bio",
    id: 0,
  },
];

// add user
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

//get users
server.get("/api/users", (req, res) => {
  users
    ? res.status(200).json(users)
    : res.status(500).json({
        errorMessage: "The users insformation could not be retrieved",
      });
});

//get users by id
server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;

  const user = users.find((e) => e.id == id);

  user
    ? res.json(user)
    : res
        .status(404)
        .json({ message: "The user with the specified ID does not exist" });
});

//delete users by id
server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;

  const user = users.find((e) => e.id == id);
  users = users.filter((e) => e.id !== id);

  user
    ? res.status(200).json(users)
    : res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
});

// put users by id
server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
});

const PORT = 5001;
server.listen(PORT, () => 
    console.log(`\n** API running on http://localhost:${PORT} **\n`)
);