const express = require('express');

const server = express();

let users = [
  {
  id: "a_unique_id", // hint: use the shortid npm package to generate it
  name: "Jane Doe", // String, required
  bio: "Not Tarzan's Wife, another Jane",  // String, required
  }
];

// middleware
server.use(express.json()); 

//endpoints
server.post('/api/users', (req, res) => {
  const user = req.body;
  if(user.name === '' || user.bio === '') {
    res.status(400).json({ errorMessage: "The users information could not be retrieved." })
  } else {
    users.push(user);
    res.status(201).json(user); 
  }
  if (!user) {
    res.status(500).json({ errorMessage: "There was an error while saving the user to the database" });
  }
});

server.get('api/users', (req, res) => {
  users 
  ? res.status(200).json(users)
  : res.status(500).json({ errorMessage: "The users information could not be retrieved." })
})

server.get('api/users/:id', (req, res) => {
  const id = req.params.id;

  const user = users.find((e) => e.id == id);

  user
  ? res.json(200).json(user)
  : res.json(404).json({ message: "The user with the specified ID does not exist." })
});

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;

  const user = users.find((e) => e.id == id);
  users = users.filter((e) => Number(e.id) !== id);

  user
    ? res.status(200).json(users)
    : res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
});


const port = 6000;
server.listen(port, () => console.log(`api listening on port ${port}`))