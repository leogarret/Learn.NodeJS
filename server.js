let app = require('express')()

app.get('/', (req, res) => {
    res.send('index.html')
})

app.get('/account', (req, res) => {
    res.send('Votre compte')
})

app.listen(8080)

/*
let http = require('http')
let fs = require('fs')
let url = require('url')
let hello = require('./hello')

http.createServer()
    .on('request', (request, response) => {
        fs.readFile('index.html', 'utf-8', (error, data) => {
            if (error) {
                response.writeHead(404, {
                    'Content-type': 'text/html; charset=utf-8'
                })
                response.end('Cette page n\'existe pas.')
            }
            response.writeHead(200, {
                'Content-type': 'text/html; charset=utf-8'
            })
            let query = url.parse(request.url, true).query;
            data = data.replace('{{ name }}', query.name || 'anonyme')
            hello('Leo')
            response.end(data)
        })
    })
    .listen(8080)
 */