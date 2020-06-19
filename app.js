const path = require('path')
const hbs = require('hbs')
const express = require('express')

const app = express()

const publicPath = path.join(__dirname, './public')
const viewsPath = path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)

app.use(express.static(publicPath))

app.get('', (req, res) => {
    
    res.render('index')

})

app.listen('3000', () => {
    console.log('Server is up!!!')
})