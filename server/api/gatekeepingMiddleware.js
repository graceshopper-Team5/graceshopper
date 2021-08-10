// this will store all of our functions that will act as middleWare between our request and response
const {models: {User}} = require ('../db');

const requireToken = async (req, res, next) => {
try {
  // sends headers along for every request made - stored locally and also attatched to every req.body - token will persist unless a user logs out
  // give them a token when they log in, and it gets passed back and forth every time there is a request
  const token = req.headers.authorization;
  // find user if they're valid
  const user = await User.findByToken(token);
  // if successful, we can make the user avail and send to next path
  req.user = user;
  next()
}
catch(e) {
  next(e)
}
}

const isAdmin = async (req, res, next) => {
  // if my user is an admin, let them through, they have access to put/post/delete routes / capabilities
    if (!req.user.isAdmin) {
      return res.status(403).send('You shall not pass!')
  } else {
    next();
  }
  }


module.exports = {
  requireToken,
  isAdmin
}

//isAdmin needs to be added to User model, default false
// isAdmin is attached to user body, so
//if (!req.user.isAdmin) {
  //return res.status(403).send('You shall not pass!")
//}
