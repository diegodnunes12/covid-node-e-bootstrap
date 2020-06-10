const path = require('path')
const request = require('request')
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



const getData = (callback) => {

    const url = 'https://api.covid19api.com/summary'

    request({url: url, json: true}, (err, resp) => {

        if(err){
            console.log('Ocorreu algum erro')
        }

        const parseJson = resp.body

        const data = {
            NewConfirmed : parseJson.Global.NewConfirmed,
            TotalConfirmed : parseJson.Global.TotalConfirmed,
            NewDeaths : parseJson.Global.NewDeaths,
            TotalDeaths : parseJson.Global.TotalDeaths,
            NewRecovered : parseJson.Global.NewRecovered,
            TotalRecovered : parseJson.Global.TotalRecovered,
            Countries: parseJson.Countries
        }

        callback(data)

    })

}

let obj = {}

let newConfirmed = "0"
let totalConfirmed = "0"
let newDeaths = "0"
let totalDeaths = "0"
let newRecovered = "0"
let totalRecovered = "0"

getData((data) => {
    newConfirmed = data.NewConfirmed
    totalConfirmed = data.TotalConfirmed
    newDeaths = data.NewDeaths
    totalDeaths = data.TotalDeaths
    newRecovered = data.NewRecovered
    totalRecovered = data.TotalRecovered
})

app.get('', (req, res) => {
    
    res.render('index', {
        newConfirmed,
        totalConfirmed,
        newDeaths,
        totalDeaths,
        newRecovered,
        totalRecovered
    })

})

app.listen('3000', () => {
    console.log('Server is up!!!')
})