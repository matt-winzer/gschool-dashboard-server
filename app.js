const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const port = process.env.port || 3000
const app = express()

app.use(cors())
app.use(morgan(process.env.NODE_ENV !== 'production' ? 'dev' : 'combined'))
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.send('hit me baby, one more time')
})

app.use(notFound)
app.use(errorHandler)

function notFound(req, res, next) {
    res.status(404).send({error: 'Not found!', status: 404, url: req.originalUrl})
}

function errorHandler(err, req, res, next) {
    console.error('ERROR', err)
    const stack =  process.env.NODE_ENV !== 'production' ? err.stack : undefined
    res.status(500).send({error: err.message, stack, url: req.originalUrl})
}

app.listen(port)
.on('error',     console.error.bind(console))
.on('listening', console.log.bind(console, 'Listening on http://0.0.0.0:' + port))
            