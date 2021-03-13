const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const link = req.protocol + '://' + req.get('host') + req.originalUrl
  const accessToken = req.headers['x-access-token'];
  const aToken = req.headers['Cookie'];
 
  if (accessToken) {
    try {
      const decoded = jwt.verify(accessToken, 'secretkeyy');
      req.accessTokenPayload = decoded;
      console.log(decoded);
    } catch (err) {
        return res.status(401).json({
          message: 'Invalid access token.'
        })
    }
    // console.log('guest', req.method );
    next();
  } else {
    // console.log('guest', req.method );
    return res.status(400).json({
      message: 'Access token not found.'
    })
  }
}