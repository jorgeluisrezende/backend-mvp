const debug = require('debug')('gandalf:error')
const PublicError = require('./../classes/PublicError')

module.exports = (err, req, res, next) => {
  debug('Handling error.')
  debug(`Code: ${err.code}, Message: ${err.message}`)
  if (err instanceof PublicError) {
    debug('Is an instance of PublicError')
    res.status(err.code).send(err.message)
  }
}
