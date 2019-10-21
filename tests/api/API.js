const { describe, it, before, after } = require('mocha')
const assert = require('chai').assert
const rp = require('request-promise')
const app = require('./../../app.js').app

/**
 * Set application port
 * @type {Number}
 */
const port = 8000

/**
 * Instantiate a class of Template.
 * @param  {String} The default uri to be used in the requests, without the last / for endpoints.
 * @return {function} A function to make requests easy with all the options.
 */
const Template = require('./template/request.js')('http://localhost:' + port + '/proto')

/**
 * Start the application instance to be consumed by the test.
 * @param  {Function} the done() callback function. Provided by the mocha framework.
 */
before(done => app.listen(port, done))

describe('API', function () {
  describe('access', function () {
    it('should be able to respond a heartbeat request', async function () {
      try {
        const res = await rp(Template.req('GET', '/ping'))

        assert.strictEqual(res.statusCode, 200)
        assert.strictEqual(res.body, 'pong')
      } catch (res) {
        assert.fail(res)
      }
    })

    it('should be able to respond a request to an unexisting endpoint', async function () {
      const res = await rp(Template.req('GET', '/non-existent-endpoint'))
      assert.strictEqual(res.statusCode, 404)
      assert.strictEqual(res.body, 'Unable to find path or execute method on path.')
    })

    it('should be able to respond a correct username and password', async function () {
      try {
        const user = {
          username: 'frodo',
          password: 'mordor'
        }

        const req = Template.req('POST', '/user/authenticate', user)

        const res = await rp(req)

        assert.strictEqual(res.statusCode, 200, 'statusCode match')
        assert.strictEqual(res.body, true, 'returned bool is true')
      } catch (res) {
        assert.fail(res)
      }
    })

    it('should be able to respond an incorrect username', async function () {
      const user = {
        username: 'non-existent-user',
        password: 'mordor'
      }

      const req = Template.req('POST', '/user/authenticate', user)
      const res = await rp(req)
      assert.strictEqual(res.statusCode, 403, 'status code match')
      assert.strictEqual(res.body, 'User not found.', 'message match')
    })

    it('should be able to respond an incorrect password', async function () {
      const user = {
        username: 'frodo',
        password: 'non-existent-password'
      }

      const req = Template.req('POST', '/user/authenticate', user)
      const res = await rp(req)
      assert.strictEqual(res.statusCode, 403, 'status code match')
      assert.strictEqual(res.body, 'Username or password incorrect.', 'message match')
    })

    it('should be able to respond an empty username and password', async function () {
      const req = Template.req('POST', '/user/authenticate', {})
      const res = await rp(req)
      assert.strictEqual(res.statusCode, 400, 'status code match')
      assert.strictEqual(res.body, 'Empty username or password. Check your request.', 'message match')
    })
  })

  describe('register', function () {
    before(async function () {
      // remove possible already entered username
      const req = Template.req('DELETE', '/user/:id')
      const res = await rp(req)

    })

    it('should be able to register a new user', async function () {
      const user = {
        username: 'samwise',
        password: 'gollum'
      }

      const req = Template.req('POST', '/user/register', user)
      const res = await rp(req)
      assert.strictEqual(res.statusCode, 201, 'status code match')
      assert.strictEqual(res.body, 'Username register successfully.', 'message match')
    })

    it('shouldn\'t be able to register an user with the same username ', async function () {
      const user = {
        username: 'frodo',
        password: 'gollum'
      }

      const req = Template.req('POST', '/user/register', user)
      const res = await rp(req)
      assert.strictEqual(res.statusCode, 409, 'status code match')
      assert.strictEqual(res.body, 'Username register successfully.', 'message match')
    })
  })
})

/**
 * Stops the application instance after the test is finished.
 * @param  {Function} done Callback for finishing the tests.
 */
after(done => done())
