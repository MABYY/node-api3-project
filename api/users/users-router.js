const { restart } = require('nodemon');
const express = require('express');

const {logger, 
      validateUserId,
      validateUser,
      validatePost} = require('../middleware/middleware')
      
const Users = require('./users-model') 
const Posts = require('../posts/posts-model') 
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();


router.get('/', async (req, res, next) =>{ // it can take next as an argument because it's a MW function
  try{
      const users = await Users.get()
      res.status(200).json(users);
  } catch(next) { // this works because carch expects a MW fc that takes err as an argument
    // next(err) we are sending the err mesg to the inmediate MW fc
  }
});


router.get('/:id', validateUserId, async (req, res,next) => {
  res.status(200).json(req.user);
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  // Users.getById(req.params.id)
  // .then(user => {
  //     if (user) {
  //         res.status(200).json(user);
  //     } else {
  //         res.status(404).json({ message: 'user not found' });
  //     }
  // })
  // .catch(next) ;
});

router.post('/', validateUser , async (req, res,next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
    try {
      const user = await Users.insert(req.body)
      res.status(201).json(user);
      
    } catch(next) {

  }
  // try {
  //   const user = await Users.insert(req.body)
  //     if (user) {
  //       res.status(201).json(user);
  //     } else {
  //       res.status(404).json({ message: 'user not found' });
  //     } 
  //   } catch(next) {

  // }
});

router.put('/:id', validateUserId, validateUser, async (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid

  try{
    const user = await Users.update(req.params.id, req.body)
    res.status(200).json(user)
  } catch(next){ 
}
    // try{
    //     if(!req.body) {
    //       res.status(400).json({
    //         message:"Please provide contents for the post",
    //       })
    //     } else {
    //       const user = await Users.getById(req.params.id)
    //       if(!user){
    //         res.status(404).json({message: " ID not found"})
    //       } else{
    //         await Users.update(req.params.id, req.body)
    //         res.status(200).json(user)
    //       }
    //     }

    // } catch(next){
      
    // }

});

router.delete('/:id', validateUserId, async (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id

  try{
    const remUser = await Users.remove(req.params.id)
    res.status(200).json(remUser)
  } catch(next) {
  }
  // try{
  //   const remUser = await Users.getById(req.params.id)
  //   if(!remUser) {
  //     res.status(404).json({
  //       message:" ID not found"
  //     })
  //   } else {
  //     Users.remove(req.params.id)
  //     res.status(200).json(remUser)
  //   }
  // } catch(next){

  // }
});

router.get('/:id/posts', validateUserId, async (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  try{
      const posts = await Users.getUserPosts(req.params.id)
      res.status(200).json(posts)
  } catch (next){

  }
  // try{
  //   const user = await Users.getById(req.params.id)
  //   if(!user){
  //     res.status(404).json({
  //       message:"ID Not found",
  //     })
  //   } else {
  //     const posts = await Users.getUserPosts(req.params.id)
  //     res.status(200).json(posts)
  //   }

  // } catch (next){

  // }
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid

  try{
        const newPost = {user_id: req.user.id,
                        text: req.body.text}
        Posts.insert(newPost)
        res.status(201).json(newPost)
 
  } catch (next){

  }
  // try{
  //   const user = await Users.getById(req.params.id)
  //     if(!user){
  //       res.status(404).json({
  //         message:"ID Not found",
  //       })
  //     } else {
  //       const newPost = {user_id: user.id,
  //                       text: req.body.text}
  //       Posts.insert(newPost)
  //       res.status(201).json(newPost)
  //     }
  // } catch (next){

  // }
});


// Error handling middleware
router.use((err,req,res,next) =>{
  res.status(err.status || 500).json({
    custom: "There is an error",
    message: err.message,
    stack: err.stack,
  })
})

// next is a callback function that allos 
// req and res to preoceede to the next piece of middleware


// do not forget to export the router
module.exports = router;

