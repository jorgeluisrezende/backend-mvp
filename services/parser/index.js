const PublicError = require('./../../classes/PublicError')

module.exports = {
  /**
   * Extract username and password from a request
   * @param  {Object} req Express request object.
   * @return {Object}     An object containing username and password.
   */
  extractUserAndPassword (req) {
    if (req.body.username && req.body.password) {
      return {
        username: req.body.username,
        password: req.body.password
      }
    } else {
      throw new PublicError(400, 'Empty username or password. Check your request.')
    }
  }
}
