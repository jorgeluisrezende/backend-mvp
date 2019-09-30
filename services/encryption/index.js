const crypto = require('crypto')

module.exports = {
  sha256 (string) {
    const hash = crypto.createHash('sha256')
    return hash.update(string).digest('hex')
  }

}
