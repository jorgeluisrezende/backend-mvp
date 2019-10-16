class PublicError extends Error {
  constructor (code, message, category = 'default') {
    super(message)
    this.name = 'PublicError'
    this.code = code
    this.category = category
  }
}

module.exports = PublicError
