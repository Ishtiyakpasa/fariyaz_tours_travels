const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/hajj', function (req, res){
    res.send('welcome to hajj page')
})

app.listen(8000)