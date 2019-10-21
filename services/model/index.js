const debug = require('debug')('gandalf:services:authentication:model')
const sqlite = require('sqlite')
const dbp = sqlite.open('./services/model/db.db', { Promise, cached: true })
const SQL = require('sql-template-strings')
const PublicError = require('./../../classes/PublicError')

module.exports = {
  /**
   * Directly get the usernameHash inside the database.
   * @param  {String} usernameHash User name hash
   * @return {String}              [description]
   */
  async getPasswordHash (username) {
    debug(`username: ${username}`)
    const db = await dbp
    const res = await db.get(SQL`SELECT passwordHash FROM users WHERE username=${username}`)
    if (res) {
      return res.passwordHash
    } else {
      throw new PublicError(403, 'User not found.')
    }
  },

  async registerUser (username, passwordHash) {
    debug(`
      username: ${username}
      passwordHash: ${passwordHash}
    `)

    const db = await dbp
    const res = await db.get(SQL`INSERT users(username, passwordHash) VALUES (${username}, ${passwordHash})`)
    debug(`res: ${res}`)

    if (res) {
      return res.passwordHash
    } else {
      throw new PublicError(403, 'User not found.')
    }
  }
}
