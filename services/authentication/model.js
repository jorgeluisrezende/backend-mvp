const sqlite = require('sqlite')
const dbp = sqlite.open('./services/authentication/authentication.db', { Promise, cached: true })
const SQL = require('sql-template-strings')
const PublicError = require('./../../classes/PublicError')

module.exports = {
  /**
   * Directly get the usernameHash inside the database.
   * @param  {String} usernameHash User name hash
   * @return {String}              [description]
   */
  async getPasswordHash (usernameHash) {
    const db = await dbp
    const res = await db.get(SQL`SELECT passwordHash FROM users WHERE usernameHash=${usernameHash}`)
    if (res) {
      return res.passwordHash
    } else {
      throw new PublicError(403, 'Username or password incorrect.')
    }
  }
}
