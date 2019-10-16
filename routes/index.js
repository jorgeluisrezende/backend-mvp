const debug = require('debug')('gandalf:router')
const router = require('express').Router()
const authenticate = require('./../services/authentication')
const parser = require('./../services/parser')
const PublicError = require('./../classes/PublicError')

/**
 * Healthcheck endpoint, it returns 'pong' as a healthcheck response.
 */
router.get('/ping', (req, res, next) => {
  debug('GET on /ping')
  res.status(200).send('pong')
})

/**
 * Return the user authentication as a boolean. `true` for authenticated and `false` for not authenticated.
 */
router.post('/user/authenticate', async (req, res, next) => {
  debug('POST on /user/authenticate')
  try {
    const { username, password } = parser.extractUserAndPassword(req)
    debug(`${username} and ${password}`)

    await authenticate(username, password,
      () => { res.status(200).send(true) },
      (err) => { throw err }
    )
  } catch (err) {
    next(err)
  }
})

/**
 * Default handler for the 404 erros on the router. If no enpoint applies, it sends the 404 error.
 */
router.all('*', (req, res, next) => {
  debug('Generate a 404 error over a non existent route.')
  next(new PublicError(404, 'Unable to find path or execute method on path.'))
})

module.exports = router
