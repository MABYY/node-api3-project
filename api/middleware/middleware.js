const Users = require('../users/users-model');

function logger(req, res, next) {
  // DO YOUR MAGIC
  const timeStamp = new Date()
  console.log(req.method, req.originalUrl, timeStamp)
  next()
}

async function validateUserId(req, res, next) {
  try {
      const user = await Users.getById(req.params.id)
      if(user) {
          req.user = user
          next()
    } else {
      next({ status: 404,
            message: "user not found"
      })
    } 
  } catch (error) {
    next(error)
  }
}

function validateUser(req, res, next) {
  // // DO YOUR MAGIC
  const { name } = req.body
  if(!name || !name.trim()) {
    next({status: 400,
          message: "missing required name field"
        })
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const { text } = req.body
  if(!text || !text.trim()) {
    next({status: 400,
          message: "missing required text field"
    })
  }else {
    req.text = text.trim()

    next()
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  validatePost,
  validateUser,
  validateUserId,
  logger,
}

// Video: https://www.youtube.com/watch?v=RC5KxzlSfn0
// update librearies:  
//1 - npm i -q npm-check-updates
//2 - ncu --> not working
