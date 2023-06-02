const { error } = require('console')
var express = require ('express')
var app = express()

var postgres = require ('pg')
const { Pool } = postgres
const pool = new Pool({
    user:       'postgres',
    host:       'db',
    database:   'postgres',
    password:   'postgres',
    port:       5432,
})

app.use(express.urlencoded({ extended: false }))

app.get('/', function(req, res) { res.sendFile(__dirname + '/html/index.html')})
app.get('/about', function(req, res) { res.sendFile(__dirname + '/html/about.html')})
app.get('/form', function(req, res) { res.sendFile(__dirname + '/html/form.html')})
app.get('/success', function(req, res) { res.sendFile(__dirname + '/html/success.html')})
app.get('/sendquery', function(req, res) { res.sendFile(__dirname + '/html/sendquery.html')})
app.get('/css', function(req, res) { res.sendFile(__dirname + '/css/style.css')})
app.post('/submit-form', (req, res) => { 
    const { nome, cognome, email } = req.body
    const query = 'INSERT INTO users (nome, cognome, email) VALUES ($1, $2, $3)'
    const values = [nome, cognome, email]

    pool.query(query, values, (error, result) => {
        if (error) {
            res.status(500).send('query fallita con il seguente errore:\n', + error.message)
        }
        res.status(200).sendFile(__dirname + '/html/success.html')
    })
})
app.post('/submit-query', (req, res) => {
    const query = req.body.query
    pool.query(query, (error, result) => {
        if (error) {
            res.status(500).send('query fallita con il seguente errore:\n', + error.message)
        }
        const tmp = result.rows
        res.status(200).send(JSON.stringify(tmp, null, 2))
        //res.status(200).json(result.rows)
    })
})


var server = app.listen(8000, function() { console.log('Listening on port 8000') })