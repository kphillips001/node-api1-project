const express = require('express');

const server = express();

// middleware
server.use(express.json()); 

const port = 6000;
server.listen(port, () => console.log(`api listening on port ${port}`))