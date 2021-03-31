const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const link = req.protocol + '://' + req.get('host') + req.originalUrl
  const accessToken = req.headers['accesstoken'];
  const refreshToken = req.headers['refreshtoken'];
  console.log(refreshToken)
  if (accessToken && accessToken != undefined && accessToken != 'undefined' && 
  (!refreshToken || refreshToken == 'undefined' || refreshToken == undefined)) { 
    try {
      const decoded = jwt.verify(accessToken, 'secretkeyy');
      req.uid = decoded.uid;
      // console.log(decoded);
    } catch (err) {
        return res.status(401).json({
          message: 'Invalid access token.'
        })
    }
    next();
  } 
  else if (!refreshToken || refreshToken == undefined || refreshToken == 'undefined') {
    return res.status(400).json({
      message: 'Refresh token not found.'
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
        res.json({status:'New access token', accessToken: newaccessToken});
      } catch (err) {
          req.refreshToken = refreshToken;
          next();
      }
  }
}