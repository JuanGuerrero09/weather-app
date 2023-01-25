import './style.css'


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
  console.log(cityWeather, countryFlag, name, tempData);
}

const bucaramanga = await setWeatherParams('bucaramanga')

await setWeatherParams('bucaramanga')
