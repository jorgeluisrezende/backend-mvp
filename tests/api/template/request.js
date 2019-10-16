class Template {
  constructor (uri) {
    this.uri = uri
  }

  req (method, endpoint, body) {
    const req = {
      headers: {
        'User-Agent': 'Gandalf.id Testing tool'
      },
      json: true,
      simple: false,
      resolveWithFullResponse: true,
      method: method,
      uri: this.uri + endpoint,
      body: body
    }

    return req
  }
}

module.exports = (uri) => {
  return new Template(uri)
}
