const express = require('express')
const app = express()
const Link =require('./database/models').Link

//EJS
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))

app.get('/', function (req, res) {
  Link.findAll({
    attributes: ['link', 'shortlink']
  }).then(link => {
    res.render('index', {link});
  })
})
 
app.get('/input', function (req, res){
  res.render('input.ejs', { alert: false })
})

app.post('/input', function (req, res){
  let link = req.body.link;
  let shortLink = req.body.slink;
  let linkWithPrefix = link.indexOf('http') !== -1 ? link : `https://${link}`

  if(shortLink == ''){
    shortLink = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 6);
  }

  Link.findOne({
    where: {
      shortlink: shortLink
    }
  }).then(link => {
    if (!link) {
      Link.create({
        link: linkWithPrefix,
        shortlink: shortLink
      }).then(() => {
        res.redirect('/')
      })
    } else {
      res.render('input', { alert: true})
    }
  }).catch(err => {
    return res.render('input', { alert: true })
  })
})

app.get('/:id', function (req, res){ 
  Link.findOne({
    where:{
      shortlink: req.params.id
    }
  }).then(Link =>{
    res.redirect(Link.link)
  })
})

app.listen(3000)