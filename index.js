var express = require ('express')
var app = express()

const multer = require ('multer')
const storage = multer.diskStorage({
    destination: 'images',
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  })
const upload = multer ({ storage })

require ('dotenv').config()

const { Pool } = require ('pg')
const pool = new Pool({
    user:       process.env.DB_USER,
    host:       process.env.DB_HOST,
    database:   process.env.DB_NAME,
    password:   process.env.DB_PASS,
    port:       process.env.DB_PORT,
})

app.use(express.urlencoded({ extended: false }))
app.use(express.static('html'))
app.use(express.static('css'))
app.use(express.static('images'))

app.post('/submit-form', (req, res) => { 
    const { nome, cognome, email } = req.body
    const query = 'INSERT INTO users (nome, cognome, email) VALUES ($1, $2, $3)'
    const values = [nome, cognome, email]

    pool.query(query, values, (error, result) => {
        if (error) {
            res.status(500).send('query fallita con il seguente errore:\n' + error.message)
        }
        res.status(200).sendFile(__dirname + '/html/success.html')
    })
})
app.post('/submit-query', (req, res) => {
    const query = req.body.query
    pool.query(query, (error, result) => {
        if (error) {
            res.status(500).send('query fallita con il seguente errore:\n' + error.message)
        }
        const tmp = result.rows
        res.status(200).send(JSON.stringify(tmp, null, 2))
    })
})
app.post('/upload-image', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(500).send('Upload fallito.')
    }
    res.status(200).send('Immagine caricata con successo')
})


var server = app.listen(8000, function() { console.log('Listening on port 8000') })