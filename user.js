let mongoose = require('mongoose')
let crypto = require('crypto')
const PEPPER = 'N0D3ASYC!'

require('songbird')

let userSchema = mongoose.Schema({
  email: String,
  password: String
})

userSchema.methods.generateHash = async function(password) {
  let hash = await crypto.promise.pbkdf2(password, PEPPER, 4096, 512, 'sha256')
  return hash.toString('hex')
}

userSchema.methods.validatePassword = async function(password) {
  let hash = await crypto.promise.pbkdf2(password, PEPPER, 4096, 512, 'sha256')
  return hash.toString('hex') === this.password
}

module.exports = mongoose.model('User', userSchema)
