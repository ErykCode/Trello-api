const express = require('express')
const app = express()
const hostname = 'localhost'
const port = 8017

app.get('/', function (req, res) {
  res.send('<h1>Hello Trello Api</h1>')
})

app.listen(port, hostname, () =>{
  console.log(`Trello Web server listening server at http://${hostname}:${port}/`);
})