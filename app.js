const request = require('request')

const getData = (callback) => {

    const url = 'https://api.covid19api.com/summary'

    request({url: url, json: true}, (err, resp) => {

        if(err){
            console.log('Ocorreu algum erro')
        }

        const parseJson = resp.body

        /*console.log(parseJson)
        console.log('------')
        console.log(parseJson.Global)*/

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

console.log('teste')