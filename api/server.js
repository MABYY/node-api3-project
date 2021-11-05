const express = require('express');
const usersRouter = require('./users/users-router');
const server = express();


// remember express by default cannot parse JSON in request bodies

server.use(express.json()); // invoke a function that returns a middleware
                            // it teaches express to read json format from request bodies
server.use('/api/users',usersRouter);


// global middlewares and the user's router need to be connected here

server.get('/', (req, res) => {
  res.send(`
  <h2>Let's write some middleware!</h2>
  `);
});


module.exports = server;


// server.use(logger);
// function logger (req, res, next) {
// console.log(req.method , req.url) 
// next() // send response to the client or call next
// }

// server.use(morgan('tiny));

// cors  ---> checks headers
// server.use(cors())

// helment ---> adds security related headers to requests