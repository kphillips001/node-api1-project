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
server.get('/', (req, res) => {
  res.json({ api: "running..."})
})

server.get('/api/users', (req, res) => {
  res.json(users)
})

server.get('./api/users/:id', (req, res) => {
  const id = req.params.id;

  const user = users.find((e) => e.id == id);

  user ? res.status(201).json(user) : res.status(500).json({ errorMessage: "The users information could not be retrieved."})
});


const port = 6000;
server.listen(port, () => console.log(`api listening on port ${port}`))