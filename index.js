require('bootstrap')
require('songbird')
let express = require('express')
let morgan = require('morgan')
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
let session = require('express-session')
let passport = require('passport')
let flash = require('connect-flash')
let mongoose = require('mongoose')
let passportMiddleware = require('./middleware/passport')
let routes = require('./routes')

// const NODE_ENV = process.env.NODE_ENV
const PORT = process.env.PORT || 8000

let app = express()
app.passport = passport

app.use(morgan('dev')) // Request logging
app.use(cookieParser('ilovethenodejs')) // Session cookies
app.use(bodyParser.json()) // req.body for PUT/POST forms (login/signup)
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs') // Use ejs for templating

// In-memory session support, required by passport.session()
app.use(session({
  secret: 'ilovethenodejs',
  resave: true,
  saveUninitialized: true
}))

app.use(passport.initialize()) // Enable passport middleware
app.use(passport.session()) // Enable passport persistent sessions
app.use(flash()) // Enable session-based error messaging

passportMiddleware(app) // Configure passport strategies 
routes(app) // Configure passport routes

mongoose.connect('mongodb://127.0.0.1:27017/authenticator') // Connect to DB
// Start the server
app.listen(PORT, ()=> console.log(`Listening @ http://127.0.0.1:${PORT}`))
