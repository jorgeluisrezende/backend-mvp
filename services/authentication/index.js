
const debug = require('debug')('gandalf:services:authentication')

const model = require('./../model')
const hash = require('./../hash')

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
  username,
  password,
  success = () => {},
  fail = () => {}
) {
  debug(`
    Username: ${username}, 
    Password: ${password}, 
    Success: ${success}, 
    Fail: ${fail}`
  )

  try {
    const pHash = await model.getPasswordHash(username)
    debug(`pHash: ${pHash}`)

    if (await hash.compare(password, pHash)) {
      success()
      return true
    } else {
      throw new PublicError(403, 'Username or password incorrect.')
    }
  } catch (err) {
    fail(err)
    return false
  }
}

