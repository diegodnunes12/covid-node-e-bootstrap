console.log('teste')

getData('BR')

$('#select-country').change(function() {
    let country = $('#select-country').val()
    
    $('#flag').attr('src', `/images/${country}.png`)
    getData(country)
})

function getData (countryCode) {
    fetch('https://api.covid19api.com/summary').then( (res) => {
        res.json().then( (data) => {

            $('#confirmedGlobal').text(`${data.Global.TotalConfirmed.toLocaleString('pt-br')} / ${data.Global.NewConfirmed.toLocaleString('pt-br')}`)
            $('#deathsGlobal').text(`${data.Global.TotalDeaths.toLocaleString('pt-br')} / ${data.Global.NewDeaths.toLocaleString('pt-br')}`)
            $('#recoveredGlobal').text(`${data.Global.TotalRecovered.toLocaleString('pt-br')} / ${data.Global.NewRecovered.toLocaleString('pt-br')}`)

            let country = data.Countries.filter(dt => dt.CountryCode == countryCode)
            let countryDate = new Date(country[0].Date)

            $('#updatedDate').text(formatDate(countryDate))

            $('#newConfirmed').text(country[0].NewConfirmed.toLocaleString('pt-br'))
            $('#totalConfirmed').text(country[0].TotalConfirmed.toLocaleString('pt-br'))
            $('#newDeaths').text(country[0].NewDeaths.toLocaleString('pt-br'))
            $('#totalDeaths').text(country[0].TotalDeaths.toLocaleString('pt-br'))
            $('#newRecovered').text(country[0].NewRecovered.toLocaleString('pt-br'))
            $('#totalRecovered').text(country[0].TotalRecovered.toLocaleString('pt-br'))
        })
    } )
}

// Recupera a data passada UTC e converte para o formato pt-br
function formatDate(date){
    let day = twoDigitsFormat(date.getDate())
    let month = twoDigitsFormat(date.getMonth() + 1)
    let year = date.getFullYear()
    let hour = twoDigitsFormat(date.getHours())
    let minute = twoDigitsFormat(date.getMinutes())
    let second = twoDigitsFormat(date.getSeconds())

    return (`${day}/${month}/${year} ${hour}:${minute}:${second}`)
}

// Exige que todos os dados da data e hora tenham dois digítos
function twoDigitsFormat(date){
    return ("0" + (date)).slice(-2)
}

