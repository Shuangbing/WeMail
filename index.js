var express = require('express')
var app = express()

app.use(require('cors')())
app.use(express.json())

require('./config/database')(app)
require('./route')(app)
require('./plugin/mailin')(app)

app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
})

app.listen(3005, function () {
    console.log('listening on port 3000!')
})
