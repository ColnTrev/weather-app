const api_url = "https://skycast-api.herokuapp.com/api/";

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(event){
    if(event.keyCode === 13){
        getResults(searchbox.value);
    }
}

function getResults(query){
    const request = `${api_url}${query}`;
    fetch(request).then(weather => weather.json()).then(displayResults);
}

function displayResults(weather){
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.cityData.name}, ${weather.cityData.state}`;

    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder();

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.forecast.main.temp)}<span>°F</span>`

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.forecast.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.forecast.main.temp_min)}°F / ${Math.round(weather.forecast.main.temp_max)}°F`;
}

function dateBuilder() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2,'0');
    let mm = String(today.getMonth()+1).padStart(2,'0');
    let yyyy = today.getFullYear();
    let formatted = mm + '/' + dd + '/' + yyyy;
    return formatted; 
}