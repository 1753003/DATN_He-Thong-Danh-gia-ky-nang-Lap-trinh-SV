const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const link = req.protocol + '://' + req.get('host') + req.originalUrl
  const accessToken = req.headers['accesstoken'];
  const refreshToken = req.headers['refreshtoken'];
  const aToken = req.headers['Cookie'];
  console.log(req.headers);
  if (accessToken) {
    try {
      const decoded = jwt.verify(accessToken, 'secretkeyy');
      req.uid = decoded.uid;
      console.log(decoded);
    } catch (err) {
        return res.status(401).json({
          message: 'Invalid access token.'
        })
    }
    next();
  } else if (!refreshToken) {
    return res.status(400).json({
      message: 'Access token not found.'
    })
  }
  else {
    try {
        const decoded = jwt.verify(refreshToken, 'secretkeyy');
        var newaccessToken = jwt.sign(
          {
            uid: decoded.uid
          }, 
          'secretkeyy', 
          {
            expiresIn: "300s"
          });
        res.json({status:'New accesstoken', accessToken: newaccessToken});
      } catch (err) {
          return res.status(401).json({
            message: 'Invalid refresh token.'
          })
      }
  }
}