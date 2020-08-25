/* get city and state input value */

function getCityValue() {
    const city = $('#city').val();
    return city;
}

function getStateValue() {
    const state = $('#state').val();
    return state;
}

/* retrieve Air Quality Index for City */

function getAqi() {
    fetch(`https://api.airvisual.com/v2/city?city=${getCityValue()}&state=${getStateValue()}&country=USA&key=b5aa4c6e-6bbe-43e4-b1eb-11792676fa0c`)
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
            $('.aqi-temp-results').removeClass('hidden');
            $('.aqi-temp-results').addClass('no-background');
            $('.aqi-results').html('<p>Oops! We cannot find the AQI for this location. Please enter a U.S. City and State.</p>');
            $('.temp-results').empty();
            $('.map-results').html('<iframe width="600" height="600" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyApS1VF4GSnDqqOFg6MoMn_8PAVjuBYjPo&q=united states" allowfullscreen></iframe>');
        });
} 

/* display AQI results */

function displayAqiResults(responseJsonAqi) {
    $('.aqi-temp-results').removeClass('hidden');
    addColor(responseJsonAqi);
    $('.aqi-results').html(`<h3>The AQI for ${getCityValue()} is: ${responseJsonAqi.data.current.pollution.aqius}</h3>`);
}

/* retrieve current weather for city */

function getCurrentTemp() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${getCityValue()}&appid=b9513a2d189c1d241b1b2d3d6347f3d8&units=imperial`)
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
        }); 
}

/* display current temperature results */

function displayTempResults(responseJsonTemp) {
    $('.temp-results').html(`<h3>Current Temperature: ${responseJsonTemp.main.temp} °F</h3>`)
}

/* add colors to results */ 

function addColor(responseJsonAqi) {
    $('.aqi-temp-results').removeClass('no-background green yellow orange red purple');
    if (responseJsonAqi.data.current.pollution.aqius <= 50) {
        $('.aqi-temp-results').addClass('green');
    } else if (responseJsonAqi.data.current.pollution.aqius <= 100) {
        $('.aqi-temp-results').addClass('yellow');
    } else if (responseJsonAqi.data.current.pollution.aqius <= 150) {
        $('.aqi-temp-results').addClass('orange');
    } else if (responseJsonAqi.data.current.pollution.aqius <= 200) {
        $('.aqi-temp-results').addClass('red');
    } else if (responseJsonAqi.data.current.pollution.aqius <= 250) {
        $('.aqi-temp-results').addClass('purple');
    } else {
        $('.aqi-temp-results').addClass('maroon');
    };
} 

/* display google maps location */

function displayLocation() {
    $('.map-results').html(`<iframe width="600" height="600" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyApS1VF4GSnDqqOFg6MoMn_8PAVjuBYjPo&q=${getCityValue()}" allowfullscreen></iframe>`);
}

/* watch app */

function watchApp() {
    $('.form-container form').on('submit', function(event){
        event.preventDefault();
        getAqi();
        getCurrentTemp();
        displayLocation();
    })
}

watchApp();