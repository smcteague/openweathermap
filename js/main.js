const OPENWEATHERMAP_API_KEY = '6892066b3855896d04018f9c7746bfde'
const UNSPLASH_SECRET_KEY = 'qop1F9LXV-kgdI7wu8X2Vb9K98yBfWZ5QYEu0VqqETQ'
const UNSPLASH_ACCESS_KEY = 'j9ep3hS7zMpzHFg45lZhbODQIhatW89W0GVnmNSwObw'

/**
 * @param {string} city_name;
 * @param {string} state_code;
 * @param {string} country_code;
 * @param {string} OPENWEATHERMAP_API_KEY;
 * @param {string} UNSPLASH_SECRET_KEY;
 */

async function formSubmit() {

    const form = document.getElementById('search');

    let city_name = form.elements['city-name'].value.trim();
    let zip_code = form.elements['zip-code'].value.trim();
    let state_code = form.elements['state-code'].value.trim();
    let country_code = form.elements['country-code'].value.trim();
    if (city_name == '') {
        stopPropogation()
    }

    let weather_url;
    if (zip_code != '') {
        weather_url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip_code},${country_code}&appid=${OPENWEATHERMAP_API_KEY}`

    } else {
        weather_url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name},${state_code},${country_code}&appid=${OPENWEATHERMAP_API_KEY}`
    }

    async function apiCall(weather_url) {
        try {
            let response = await fetch(weather_url);
            return await response.json();
        } catch (error) {
            return error.json();
        }
    }

    data = await apiCall(weather_url)

    let api_call_error = [data.cod, data.message]

    let image_search_url;
    image_search_url = `https://api.unsplash.com/search/photos?query=aerial-view-of-location-${city_name},${state_code},${country_code}&client_id=${UNSPLASH_ACCESS_KEY}`

    async function getImage (image_search_url) {
        try {
            let response = await fetch(image_search_url);
            return await response.json();
        } catch (error) {
            return error.json();
        }
    }

    image = await getImage(image_search_url)

    displayDiv()

    if (api_call_error[0] == 200) {
        document.getElementById("city-name-response").innerHTML = 'Weather in ';
        document.getElementById("city-name-response").insertAdjacentHTML('beforeEnd', data.name);
        document.getElementById("temp-max").innerHTML = 'Max Temp: '
        document.getElementById("temp-max").insertAdjacentHTML('beforeEnd', convertKelvinToFarenheight(data.main['temp_max']) + 'F');
        document.getElementById("temp-min").innerHTML = 'Min Temp: '
        document.getElementById("temp-min").insertAdjacentHTML('beforeEnd', convertKelvinToFarenheight(data.main['temp_min']) + 'F');
        document.getElementById("feels_like").innerHTML = 'Feels Like Temp: '
        document.getElementById("feels_like").insertAdjacentHTML('beforeEnd', convertKelvinToFarenheight(data.main['feels_like']) + 'F');
        document.getElementById("humidity").innerHTML = 'Humidity: '
        document.getElementById("humidity").insertAdjacentHTML('beforeEnd', data.main['humidity'] + '%');
        document.getElementById("place-image").innerHTML = `<img src="${image['results'][0]['urls']['small']}" alt="${image['results'][0]['alt_description']}" class="img-responsive"></img>`

    } else {
        document.getElementById("city-name-response").innerHTML = '';
        document.getElementById("city-name-response").innerHTML = api_call_error[0] + ' - ' + api_call_error[1];
        document.getElementById("temp-max").innerHTML = ''
        document.getElementById("temp-min").innerHTML = ''
        document.getElementById("feels_like").innerHTML = ''
        document.getElementById("humidity").innerHTML = ''
        document.getElementById("place-image").innerHTML = ''
    
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

    elem2 = document.getElementsByClassName("container-place-image")[0];
    elem2.style.display = "block";

    for (i = 0; i < document.getElementsByClassName("card-place-image").length; i++) {
        elem2 = document.getElementsByClassName("card-place-image")[i];
        elem2.style.display = "block";
    }
}

function hideDisplayDiv() {
    for (i = 0; i < document.getElementsByClassName("card-weather").length; i++) {
        elem2 = document.getElementsByClassName("card-weather")[i];
        elem2.style.display = "none";
    }

    for (i = 0; i < document.getElementsByClassName("card-place-image").length; i++) {
        elem2 = document.getElementsByClassName("card-place-image")[i];
        elem2.style.display = "none";
    }    
}
