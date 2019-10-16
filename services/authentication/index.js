const model = require('./model.js')
const debug = require('debug')('gandalf:services:authenticate')
const PublicError = require('./../../classes/PublicError')

/**
 * Function to authenticate an username hash and a password hash.
 * @param  {String} usernameHash Hash of the username, Base64 of a SHA256
 * @param  {String} passwordHash Hash of the password, Base64 of a SHA256
 * @param  {Function} success    Optional, Callback function in case of success.
 * @param  {Function} fail       Optional, Error handles in case of failure
 * @return {Boolean}             A bool true or false, for the authentication.
 */
module.exports = async function authenticate (
  usernameHash,
  passwordHash,
  success = () => {},
  fail = () => {}
) {
  debug(`Username: ${usernameHash}, Password: ${passwordHash}, Success: ${success}, Fail: ${fail}`)

  try {
    const retrievedPasswordHash = await model.getPasswordHash(usernameHash)

    if (retrievedPasswordHash !== passwordHash) {
      throw new PublicError(403, 'Username or password incorrect.')
    }

    if (retrievedPasswordHash === passwordHash) {
      success()
      return true
    }
  } catch (err) {
    fail(err)
    return false
  }
}
