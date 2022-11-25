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
    let state_code = form.elements['state-code'].value.trim();
    let country_code = form.elements['country-code'].value.trim();

    if (city_name == '') {
        stopPropogation()
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name},${state_code},${country_code}&appid=${API_KEY}`

    let result = await fetch(url);

    let response = await result.json();

    document.getElementById("city-name-response").innerHTML = 'Weather in ';
    document.getElementById("city-name-response").insertAdjacentHTML('beforeEnd', response.name);
    document.getElementById("temp-max").innerHTML = 'Max Temp: '
    document.getElementById("temp-max").insertAdjacentHTML('beforeEnd', convertKelvinToFarenheight(response.main['temp_max']) + 'F');
    document.getElementById("temp-min").innerHTML = 'Min Temp: '
    document.getElementById("temp-max").insertAdjacentHTML('beforeEnd', convertKelvinToFarenheight(response.main['temp_min']) + 'F');
    document.getElementById("humidity").innerHTML = response.main['humidity'] + '%';
    console.log(response)

    displayDiv()
}

function convertKelvinToFarenheight(tempKelvin) {
    return tempFarenheight = Math.ceil(((tempKelvin - 273.15) * 9/5) + 32);
}

function displayDiv() {
    let x = document.getElementById("div-weather");
        x.style.display = "block";
}