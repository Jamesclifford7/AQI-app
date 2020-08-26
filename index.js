/* get city and state input value */

function getCityValue() {
    const city = $('#city').val();
    return city.replace(/\s/g, '+');
}

function getDisplayCity() {
    const city = $('#city').val();
    return city; 
}

function getStateValue() {
    let state = $('#state').val();
    if (state === 'al' || state === 'AL') {
        state = 'alabama'
    } else if (state === 'ak' || state === 'AK') {
        state = 'alaska'
    } else if (state === 'az' || state === 'AZ') {
        state = 'arizona'
    } else if (state === 'ar' || state === 'AR') {
        state = 'arkansas'
    } else if (state === 'ca' || state === 'CA') {
        state = 'california'
    } else if (state === 'co' || state === 'CO') {
        state = 'colorado'
    } else if (state === 'ct' || state === 'CT') {
        state = 'connecticut'
    } else if (state === 'de' || state === 'DE') {
        state = 'delaware'
    } else if (state === 'fl' || state === 'FL') {
        state = 'florida'
    } else if (state === 'ga' || state === 'GA') {
        state = 'georgia'
    } else if (state === 'hi' || state === 'HI') {
        state = 'hawaii'
    } else if (state === 'id' || state === 'ID') {
        state = 'idaho'
    } else if (state === 'il' || state === 'IL') {
        state = 'illinois'
    } else if (state === 'in' || state === 'IN') {
        state = 'indiana'
    } else if (state === 'ia' || state === 'IA') {
        state = 'iowa'
    } else if (state === 'ks' || state === 'KS') {
        state = 'kansas'
    } else if (state === 'ky' || state === 'KY') {
        state = 'kentucky'
    } else if (state === 'la' || state === 'LA') {
        state = 'louisiana'
    } else if (state === 'me' || state === 'ME') {
        state = 'maine'
    } else if (state === 'md' || state === 'MD') {
        state = 'maryland'
    } else if (state === 'ma' || state === 'MA') {
        state = 'massachusetts'
    } else if (state === 'mi' || state === 'MI') {
        state = 'michigan'
    } else if (state === 'mn' || state === 'MN') {
        state = 'minnesota'
    } else if (state === 'ms' || state === 'MS') {
        state = 'mississippi'
    } else if (state === 'mo' || state === 'MO') {
        state = 'missouri'
    } else if (state === 'mt' || state === 'MT') {
        state = 'montana'
    } else if (state === 'ne' || state === 'NE') {
        state = 'nebraska'
    } else if (state === 'nv' || state === 'NV') {
        state = 'nevada'
    } else if (state === 'nh' || state === 'NH') {
        state = 'new+hampshire'
    } else if (state === 'nj' || state === 'NJ') {
        state = 'new+jersey'
    } else if (state === 'nm' || state === 'NM') {
        state = 'new+mexico'
    } else if (state === 'ny' || state === 'NY') {
        state = 'new+york'
    } else if (state === 'nc' || state === 'NC') {
        state = 'north+carolina'
    } else if (state === 'nd' || state === 'ND') {
        state = 'north+dakota'
    } else if (state === 'oh' || state === 'OH') {
        state = 'ohio'
    } else if (state === 'ok' || state === 'OK') {
        state = 'oklahoma'
    } else if (state === 'or' || state === 'OR') {
        state = 'oregon'
    } else if (state === 'pa' || state === 'PA') {
        state = 'pennsylvania'
    } else if (state === 'ri' || state === 'RI') {
        state = 'rhode+island'
    } else if (state === 'sc' || state === 'SC') {
        state = 'south+carolina'
    } else if (state === 'sd' || state === 'SD') {
        state = 'south+dakota'
    } else if (state === 'tn' || state === 'TN') {
        state = 'tennessee'
    } else if (state === 'tx' || state === 'TX') {
        state = 'texas'
    } else if (state === 'ut' || state === 'UT') {
        state = 'utah'
    } else if (state === 'vt' || state === 'VT') {
        state = 'vermont'
    } else if (state === 'va' || state === 'VA') {
        state = 'virginia'
    } else if (state === 'wa' || state === 'WA') {
        state = 'washington'
    } else if (state === 'wv' || state === 'WV') {
        state = 'west+virginia'
    } else if (state === 'wi' || state === 'WI') {
        state = 'wisconsin'
    } else if (state === 'wy' || state === 'WY') {
        state = 'wyoming'
    };
        
    return state.replace(/\s/g, '+');
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
            $('.aqi-results').html(errorMessage);
            $('.temp-results').empty();
            $('.map-results').html('<iframe width="600" height="600" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyApS1VF4GSnDqqOFg6MoMn_8PAVjuBYjPo&q=united+states" allowfullscreen></iframe>');
        });
} 

/* display AQI results */

function AqiResultsMessage(responseJsonAqi) {
    return `<h3>The AQI for ${getDisplayCity()} is: ${responseJsonAqi.data.current.pollution.aqius}</h3>`
}

function errorMessage() {
    return '<p>Oops! We cannot find the AQI for this location. Please enter a U.S. City and State.</p>'
}

function displayAqiResults(responseJsonAqi) {
    $('.aqi-temp-results').removeClass('hidden');
    addColor(responseJsonAqi);
    $('.aqi-results').html(AqiResultsMessage(responseJsonAqi));
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

function TempResultsMessage(responseJsonTemp) {
    return `<h3>Current Temperature: ${responseJsonTemp.main.temp} °F</h3>`
}

function displayTempResults(responseJsonTemp) {
    $('.temp-results').html(TempResultsMessage(responseJsonTemp))
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

function mapsLocation() {
    return `<iframe width="600" height="600" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyApS1VF4GSnDqqOFg6MoMn_8PAVjuBYjPo&q=${getCityValue()}" allowfullscreen></iframe>`
}

function displayLocation() {
    $('.map-results').html(mapsLocation);
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