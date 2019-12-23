const express = require('express')
const app = express()
const Link =require('./database/models').Link

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))

app.get('/', function (req, res) {
  // res.render('index.ejs')
  Link.findAll({
    attributes: ['link', 'shortlink']
  }).then(link => {
    res.render('index', {link});
  })
    
  
})
 
app.get('/input', function (req, res){
  res.render('input.ejs')
})

app.post('/input', function (req, res){
  const link = req.body.link;
  const slink = req.body.slink.trim()
  Link.create({
    link: link,
    shortlink: slink
  }).then(User => {
    console.log(User)
  }).catch(err=> console.log(err))
  res.redirect('/')
})


app.listen(3000)