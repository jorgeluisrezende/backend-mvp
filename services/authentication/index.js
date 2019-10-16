const model = require('./model.js')
const debug = require('debug')('gandalf:services:authenticate')
const PublicError = require('./../../classes/PublicError')

module.exports = async function authenticate (usernameHash, passwordHash, success, fail) {
  debug(`Username: ${usernameHash}, Password: ${passwordHash}, Success: ${success}, Fail: ${fail}`)

  try {
    const retrievedPasswordHash = await model.getPasswordHash(usernameHash)

    if (retrievedPasswordHash === false) {
      throw new PublicError(403, 'User not found.')
    }

    if (retrievedPasswordHash !== passwordHash) {
      throw new PublicError(403, 'Username or password incorrect.')
    }

    if (retrievedPasswordHash === passwordHash) {
      success()
    }
  } catch (err) {
    fail(err)
  }
}
