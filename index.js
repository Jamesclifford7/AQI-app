/* Get city and state input value */

function getCityValue() {
    console.log('getCityValue() is running');
    const city = $('#city').val();
    return city;
}

function getStateValue() {
    console.log('getStateValue() is running');
    const state = $('#state').val();
    return state;
}

/* retrieve Air Quality Index for City */

function getAqi() {
    fetch(`http://api.airvisual.com/v2/city?city=${getCityValue()}&state=${getStateValue()}&country=USA&key=b5aa4c6e-6bbe-43e4-b1eb-11792676fa0c`)
        .then(function(response) {
            return response.json()
        })
        .then(function(responseJsonAqi){
            if (responseJsonAqi.status === 'success') {
                return displayAqiResults(responseJsonAqi)
            } else {
                throw new Error
            } 
        })
        .catch(function(error){
            $('.aqi-results').html('<p>Oops! We cannot find the AQI for this location. Please enter a U.S. City and State.</p>');
            $('.map-results').html('<iframe width="600" height="450" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyApS1VF4GSnDqqOFg6MoMn_8PAVjuBYjPo&q=united states" allowfullscreen></iframe>');
        });
} 

/* display AQI results */

function displayAqiResults(responseJsonAqi) {
    $('.aqi-results').html(`<h3>The AQI for ${getCityValue()} is: ${responseJsonAqi.data.current.pollution.aqius}</h3>`);
    console.log('displayAqiResults() is running');
}

/* retrieve current weather for city */

function getCurrentTemp() {
    console.log('getCurrentTemp() is running');
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${getCityValue()}&appid=b9513a2d189c1d241b1b2d3d6347f3d8&units=imperial`)
        .then(function(response){
            return response.json()
        })
        .then(function(responseJsonTemp){
            if (responseJsonTemp.cod === 200) {
                return displayTempResults(responseJsonTemp)
            } else {
                throw new Error
            }
        })
        .catch(function(error){
            $('.temp-results').empty();
            // alert('Oops! We cannot find the AQI for this location. Please enter a U.S. City and State')
        }); 
}

/* display current temperature results */

function displayTempResults(responseJsonTemp) {
    $('.temp-results').html(`<h3>${responseJsonTemp.main.temp}°F</h3>`)
}

/* display google maps location */

function displayLocation() {
    console.log('displayLocation() is running');
    $('.map-results').html(`<iframe width="600" height="450" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyApS1VF4GSnDqqOFg6MoMn_8PAVjuBYjPo&q=${getCityValue()}" allowfullscreen></iframe>`);
}

/* watch app */

function watchApp() {
    $('form').on('submit', function(event){
        event.preventDefault();
        getAqi();
        getCurrentTemp();
        displayLocation();
        displayAqiResults();
        displayTempResults();
    })
}

watchApp();