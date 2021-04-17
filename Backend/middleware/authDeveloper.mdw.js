const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  console.log('rfToken',req.headers.cookie)

  const accessToken = req.headers.cookie.split(';')[0].split('=')[1];
  const refreshToken = req.headers.cookie.split(';')[1].split('=')[1];
  // console.log('rfToken',accessToken, refreshToken)
  if (accessToken && accessToken != undefined && accessToken != 'undefined' && 
  (!refreshToken || refreshToken == 'undefined' || refreshToken == undefined)) { 
    console.log('adsf1')
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
    console.log('adsf2')
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
          res.cookie('accessToken', newaccessToken, { httpOnly: true });
        // res.cookie('refreshToken', refreshToken, { httpOnly: true });
        // res.json({message:'New access token', data: {accessToken: newaccessToken}});
        next()
      } catch (err) {
          req.refreshToken = refreshToken;
          next();
      }
  }
}