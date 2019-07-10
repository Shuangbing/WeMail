require('express-async-errors')
var express = require('express')
var app = express()

app.set('secret', 'test123456!!!')
app.use(require('cors')())
app.use(express.json())

require('./config/database')(app)
require('./route')(app)
require('./plugin/mailin')(app)

app.listen(3005,()=>{})
