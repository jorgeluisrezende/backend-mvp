const debug = require('debug')('gandalf:app')
const dotenv = require('dotenv')
const app = require('express')()

dotenv.config({ path: './config/env/default.env' })
const port = process.env.APP_PORT

app.use(require('helmet')())
app.use(require('cors')())
app.use(require('compression')())
app.use(require('express').json())
app.use('/proto', require('./routes'))
app.use(require('./routes/errorHandling'))

module.exports = {
  app,
  init () {
    app.listen(
      port,
      () => debug(`App running on port ${port}.`)
    )
  }
}
