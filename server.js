let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let session = require('express-session')
let Message = require('./models/message')

// Templates engine
app.set('view engine', 'ejs')

// Middlewares
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
    secret: "j'abdp.c",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.use(require('./middlewares/flash'))

// Routes
app.get('/', (req, res) => {
    Message.all((messages) => {
        res.render('pages/index', {
            messages: messages
        })
    })
})

app.post('/', (req, res) => {
  if (req.body.message === undefined || req.body.message === '') {
      //req.session.error = "Vous n'avez pas envoyé de message"
      req.flash('error', "Vous n'avez pas écrit de message")
      res.redirect('/')
  } else {
      Message.create(req.body.message, () => {
          req.flash('success', "Votre message a été posté")
          res.redirect('/')
      })
  }
})

app.get('/message/:id', (req, res) => {
    Message.get(req.params.id, (message) => {
        res.send(message.content)
    })
})

app.listen(8080)