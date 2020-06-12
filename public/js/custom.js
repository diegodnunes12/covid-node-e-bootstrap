console.log('teste')

getData('BR')

$( "#select-country" ).change(function() {
    getData($( "#select-country" ).val())
})

function getData (countryCode) {
    fetch('https://api.covid19api.com/summary').then( (res) => {
        res.json().then( (data) => {

            let country = data.Countries.filter(dt => dt.CountryCode == countryCode);

            $("#newConfirmed").text(country[0].NewConfirmed);
            $("#totalConfirmed").text(country[0].TotalConfirmed);
            $("#newDeaths").text(country[0].NewDeaths);
            $("#totalDeaths").text(country[0].TotalDeaths);
            $("#newRecovered").text(country[0].NewRecovered);
            $("#totalRecovered").text(country[0].TotalRecovered);
        })
    } )
}

