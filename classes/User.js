module.exports = class User {
  constructor (email, passwordHash, roles) {
    this.email
    this.password
    this.roles = roles || []
  }

  static getUser () {

  }

  checkAuthentication () {

  }

  checkAuthorization () {

  }
}
