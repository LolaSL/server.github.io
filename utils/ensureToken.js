// const UserModel = require('../models/UserModel');
// const userInstance = new UserModel();


const ensureToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  if (typeof authHeader !== 'undefined') {
    const bearer = authHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();

  } else {
    res.sendStatus(403);
  }
}

// const isUser = (req, res, next) => {
//   ensureToken(req, res, () => {
//     if (req.user.id === req.params.id || req.user.isAdmin) {
//       next();
//     } else {
//       res.status(403).send("Access denied. Not authorized...");
//     }
//   });
// };

// isAdmin = async (req, res, next) => {
//   const decode = jwt.verify(req.token, secretKey)
//     req.user = await userInstance.getRoles( decode.id).select('admin')
//     if (!req.user.admin) {
//      res.status(403).send({
//       message: "Require Admin Role!"
//     });next();
//   }

 
// }






// const authJwt = {
//   ensureToken: ensureToken,
//   isAdmin: isAdmin,
//   // isUser: isUser

// };

module.exports = ensureToken;


