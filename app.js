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

/*
const getData = (callback) => {

    const url = 'https://api.covid19api.com/summary'

    request({url: url, json: true}, (err, resp) => {

        if(err){
            console.log('Ocorreu algum erro')
        }

        const parseJson = resp.body

        const data = {
            NewConfirmed : parseJson.Global.NewConfirmed,
            TotalConfirmed : parseJson.Global.NewConfirmed,
            NewDeaths : parseJson.Global.NewConfirmed,
            TotalDeaths : parseJson.Global.NewConfirmed,
            NewRecovered : parseJson.Global.NewConfirmed,
            TotalRecovered : parseJson.Global.NewConfirmed
        }

        callback(data)

    })

}

getData((data) => {
    console.log(data.NewConfirmed)
})
*/

app.get('', (req, res) => {
    res.render('index', {

    })
})

app.listen('3000', () => {
    console.log('Server is up!!!')
})