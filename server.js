let express = require('express')
let app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('pages/index')
})

app.listen(8080)