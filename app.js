const express = require('express')
const app = express()

const jwt = require('jsonwebtoken');
const passport = require('./passport')

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))

var cookieParser = require('cookie-parser');
app.use(cookieParser())

// Router
const authRouter = require('./routes/auth')

// user Router
app.use('/api', authRouter);

app.get('/', function (req, res) {
  res.send('Xin chào, đây là API quản trị')
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`Web app service listening on port ${PORT}!`)
})