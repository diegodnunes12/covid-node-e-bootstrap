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

            $('#updatedDate').text(formatDate(countryDate, true))

            $('#newConfirmed').text(country[0].NewConfirmed.toLocaleString('pt-br'))
            $('#totalConfirmed').text(country[0].TotalConfirmed.toLocaleString('pt-br'))
            $('#newDeaths').text(country[0].NewDeaths.toLocaleString('pt-br'))
            $('#totalDeaths').text(country[0].TotalDeaths.toLocaleString('pt-br'))
            $('#newRecovered').text(country[0].NewRecovered.toLocaleString('pt-br'))
            $('#totalRecovered').text(country[0].TotalRecovered.toLocaleString('pt-br'))
        })
    } )

    $('#details').attr('href', `/detalhamento/${countryCode}`)
}

// Recupera a data passada UTC e converte para o formato pt-br
function formatDate(date, hasTime){
    let day = twoDigitsFormat(date.getDate())
    let month = twoDigitsFormat(date.getMonth() + 1)
    let year = date.getFullYear()
    let hour = twoDigitsFormat(date.getHours())
    let minute = twoDigitsFormat(date.getMinutes())
    let second = twoDigitsFormat(date.getSeconds())

    if(hasTime) return (`${day}/${month}/${year} ${hour}:${minute}:${second}`)

    else return (`${day}/${month}/${year}`)
    
}

// Exige que todos os dados da data e hora tenham dois digítos
function twoDigitsFormat(date){
    return ("0" + (date)).slice(-2)
}

function getDatails(){
    $('#table').ready(function() {
        
        let url = window.location.href;
        let country = url.split('/').pop()

        $('#flag').attr('src', `/images/${country}.png`)

        fetch(`https://api.covid19api.com/total/country/${country}`).then( (res) => {
        res.json().then( (data) => {

            data.forEach((e, i) => {
                let tr = document.createElement("tr")

                let date = new Date(data[i].Date)

                let tdDate = document.createElement("td")
                tdDate.innerHTML = formatDate(date, false)
                
                let tdConfirmed = document.createElement("td")
                tdConfirmed.innerHTML = data[i].Confirmed.toLocaleString('pt-br')

                let tdDeaths = document.createElement("td")
                tdDeaths.innerHTML = data[i].Deaths.toLocaleString('pt-br')

                let tdRecovered = document.createElement("td")
                tdRecovered.innerHTML = data[i].Recovered.toLocaleString('pt-br')

                if(data[i].Confirmed != "0"){
                    tr.append(tdDate)
                    tr.append(tdConfirmed)
                    tr.append(tdDeaths)
                    tr.append(tdRecovered)

                    $("#table").append(tr)
                }
            });

            
        })
    } )

    });
}

