const API_KEY = '6892066b3855896d04018f9c7746bfde'

/**
 * @param {string} city_name;
 * @param {string} state_code;
 * @param {string} country_code;
 * @param {string} API_KEY 
 */

async function formSubmit() {

    const form = document.getElementById('search');

    // getting the element's value
    let city_name = form.elements['city-name'].value.trim();
    let zip_code = form.elements['zip-code'].value.trim();
    let state_code = form.elements['state-code'].value.trim();
    let country_code = form.elements['country-code'].value.trim();
    if (city_name == '') {
        stopPropogation()
    }

    let url;
    if (zip_code != '') {
        // url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name},zip=${zip_code},${state_code},${country_code}&appid=${API_KEY}`
        url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip_code},${country_code}&appid=${API_KEY}`

    } else {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name},${state_code},${country_code}&appid=${API_KEY}`
    }

    async function apiCall(url) {
        try {
            let response = await fetch(url);
            return await response.json();
        } catch (error) {
            return error.json();
        }
    }

    data = await apiCall(url)

    let apiCallError = [data.cod, data.message]
    console.log(apiCallError[0], apiCallError[1])

    displayDiv()

    if (apiCallError[0] == 200) {
        document.getElementById("city-name-response").innerHTML = 'Weather in ';
        document.getElementById("city-name-response").insertAdjacentHTML('beforeEnd', data.name);
        document.getElementById("temp-max").innerHTML = 'Max Temp: '
        document.getElementById("temp-max").insertAdjacentHTML('beforeEnd', convertKelvinToFarenheight(data.main['temp_max']) + 'F');
        document.getElementById("temp-min").innerHTML = 'Min Temp: '
        document.getElementById("temp-min").insertAdjacentHTML('beforeEnd', convertKelvinToFarenheight(data.main['temp_min']) + 'F');
        document.getElementById("humidity").innerHTML = 'Humidity: '
        document.getElementById("humidity").insertAdjacentHTML('beforeEnd', data.main['humidity'] + '%');

    } else {
        document.getElementById("city-name-response").innerHTML = '';
        document.getElementById("city-name-response").innerHTML = apiCallError[0] + ' - ' + apiCallError[1];
        document.getElementById("temp-max").innerHTML = ''
        document.getElementById("temp-min").innerHTML = ''
        document.getElementById("humidity").innerHTML = ''
    
        hideDisplayDiv()
    }
}

function convertKelvinToFarenheight(tempKelvin) {
    return tempFarenheight = Math.ceil(((tempKelvin - 273.15) * 9/5) + 32);
}

function displayDiv() {
    elem1 = document.getElementsByClassName("container-weather")[0];
    elem1.style.display = "block";

    for (i = 0; i < document.getElementsByClassName("card-weather").length; i++) {
        elem2 = document.getElementsByClassName("card-weather")[i];
        elem2.style.display = "block";
    }
}

function hideDisplayDiv() {
    for (i = 0; i < document.getElementsByClassName("card-weather").length; i++) {
        elem2 = document.getElementsByClassName("card-weather")[i];
        elem2.style.display = "none";
    }
}

