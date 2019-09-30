const sqlite = require('sqlite')
const dbp = sqlite.open('./services/authentication/authentication.db', { Promise, cached: true })
const SQL = require('sql-template-strings')

module.exports = {
  async getPasswordHash (usernameHash) {
    const db = await dbp
    const res = await db.get(SQL`SELECT passwordHash FROM users WHERE usernameHash=${usernameHash}`)
    if (res) {
      return res.passwordHash
    } else {
      throw new Error('Usuário não encontrado.')
    }
  }
}
