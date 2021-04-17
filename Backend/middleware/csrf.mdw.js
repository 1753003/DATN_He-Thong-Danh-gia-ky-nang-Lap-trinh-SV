var csurf = require('csurf')

module.exports = function (req, res, next) {
  const csrfProtection = csrf({
    cookie: true
  });
}