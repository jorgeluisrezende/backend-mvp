module.exports = {
  extractUserAndPassword (req) {
    if (req.body.username && req.body.password) {
      return {
        username: req.body.username,
        password: req.body.password
      }
    } else {
      throw new PublicError(400, 'Usuário ou senha em brancos. Verifique sua requisição.')
    }
  }
}
