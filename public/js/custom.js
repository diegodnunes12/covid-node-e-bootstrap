console.log('teste')

getData('BR')

$( "#select-country" ).change(function() {
    getData($( "#select-country" ).val())
})

function getData (countryCode) {
    fetch('https://api.covid19api.com/summary').then( (res) => {
        res.json().then( (data) => {

            let country = data.Countries.filter(dt => dt.CountryCode == countryCode);

            $("#newConfirmed").text(country[0].NewConfirmed.toLocaleString('pt-br'));
            $("#totalConfirmed").text(country[0].TotalConfirmed.toLocaleString('pt-br'));
            $("#newDeaths").text(country[0].NewDeaths.toLocaleString('pt-br'));
            $("#totalDeaths").text(country[0].TotalDeaths.toLocaleString('pt-br'));
            $("#newRecovered").text(country[0].NewRecovered.toLocaleString('pt-br'));
            $("#totalRecovered").text(country[0].TotalRecovered.toLocaleString('pt-br'));
        })
    } )
}

