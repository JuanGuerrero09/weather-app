import './style.css'
import {toCelsius, toFahrenheit} from 'celsius'

let cityText = document.getElementById('city')
let countryImg = document.getElementById('countryImg')
const weatherText = document.querySelectorAll('.weatherText')
const tempText = document.getElementById('tempText')
const feelsLikeText = document.getElementById('feelsLikeText')
const minTempText = document.getElementById('minTempText')
const maxTempText = document.getElementById('maxTempText')
const inputText = document.getElementById('inputText')
const weatherForm = document.getElementById('weatherForm')
let unitsBtn = document.getElementById('unitsBtn')

let units = '°C'

unitsBtn.addEventListener('click', () => {
  units = units == '°F'?'°C':'°F'
  unitsBtn.innerText = units
  unitsBtn.style.background = units == '°C'?'orange':'yellow'
  console.log(weatherText);
  weatherText.forEach(temp => {
    temp.innerText = units == '°C'?toCelsius(+temp.innerText, 2):toFahrenheit(+temp.innerText, 2)

  })
})

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  let inputCity = inputText.value?inputText.value:undefined
  inputText.value = ""
  inputText.placeholder = inputCity
  setWeatherParams(inputCity)
})


async function getWeather(city){
  let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=cbab13e08da6db0c314fd99a37f57831`)
  let weatherInfo = await response.json()
  return weatherInfo
}

async function getCountryImg(alpha){
  let response = await fetch(`https://restcountries.com/v3.1/alpha/${alpha}`)
  let country = await response.json()
  return country[0].flags.svg
}

async function setWeatherParams(city){
  let cityWeather = await getWeather(city)
  let countryFlag = await getCountryImg(cityWeather.sys.country)
  const {name, main: tempData} = cityWeather
  cityText.innerHTML = name
  countryImg.src = countryFlag
  tempText.innerText = (tempData.temp - 273.15).toFixed(2)
  feelsLikeText.innerText = (tempData.feels_like - 273.15).toFixed(2)
  minTempText.innerText = (tempData.temp_min - 273.15).toFixed(2)
  maxTempText.innerText = (tempData.temp_max - 273.15).toFixed(2)

  console.log(tempData);
}

await setWeatherParams('london')
