const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = {
  async hash (plainTextString) {
    const hash = await bcrypt.hash(plainTextString, saltRounds)
    return hash
  },

  async compare (plainTextString, hash) {
    const isOk = await bcrypt.compare(plainTextString, hash)
    return isOk
  }

}
