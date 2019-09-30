const model = require('./model.js')

module.exports = async function authenticate (usernameHash, passwordHash) {
  try {
    const retrievedPasswordHash = await model.getPasswordHash(usernameHash)

    switch (true) {
      case (retrievedPasswordHash === undefined):
        throw new Error('User not found.')
      case (retrievedPasswordHash === passwordHash):
        return true
      default:
        return false
    }
  } catch (err) {
    return err
  }
}
