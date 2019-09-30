const debug = require('debug')('gandalf:router')
const router = require('express').Router()
const authenticate = require('./../services/authentication')

/**
 * Healthcheck endpoint, it returns 'pong' as a healthcheck response.
 */
router.get('/ping', (req, res, next) => {
  res.status(200).send('pong')
})

/**
 * Return the user authentication as a boolean. `true` for authenticated and `false` for not authenticated.
 */
router.post('/user/authenticate', async (req, res, next) => {
  /* Check username and password */
  try {
    const { username, password } = req.body

    const isOk = await authenticate(username, password)

    switch (true) {
      case (isOk):
        res.status(200).send(true)
        break
      default:
        res.status(403).send('Um erro ocorreu no processo de autenticação.')
    }
  } catch (err) {
    console.log(err)
  }
})

/**
 * Default handler for the 404 erros on the router. If no enpoint applies, it sends the 404 error.
 */
router.all('*', (req, res, next) => {
  res.status(404).send(`Unable to perform ${req.method} on ${req.path}`)
})

module.exports = router
