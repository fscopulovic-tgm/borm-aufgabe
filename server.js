const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const MongoClient = require('mongodb').MongoClient

app.use(bodyParser.urlencoded({extended: true}))

var db

MongoClient.connect('mongodb://fscopulovic:BormAufgabe1@ds249025.mlab.com:49025/scopulovic-borm', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('server started at localhost:3000')
  })
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/login.html')
})

app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/views/signup.html')
})

app.post('/login', (req, res) => {
	console.log('login')
	res.redirect('/')
})

app.post('/createUser', (req, res) => {
  db.collection('users').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('Saved to the database')
    res.redirect('/')
  })
})
