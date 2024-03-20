import React, { useState, useEffect } from 'react'
import "./weather.css"
import { convertmilliseconds } from './functions'

function Weather() {

  let key = `57c57819f503aea8cc47ae4930bd04de`

  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
  const[loading, setloading] = useState(false)
  const [active, setactive] = useState(false)
  const [errors, seterrors] = useState("")

  const [city, setcity] = useState("")
  const [cityname, setcityname] = useState("")
  const [describe, setdescribe] = useState("")
  const [celsius, setcelsius] = useState("")
  const [lat, setlat] = useState("")
  const [long, setlong] = useState("")
  const [feels, setfeels] = useState("")
  const [humidity, sethumidity] = useState("")
  const [visible, setvisible] = useState("")
  const [air, setair] = useState("")
  const [sunrise, setsunrise] = useState("")
  const [sunset, setsunset] = useState("")
  const [max, setmax] = useState("")
  const [min, setmin] = useState("")

  const [currentdate, setcurrentdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setcurrentdate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [])



  function cityhandle(x) {
    setcity(x.target.value)
  }

  const fetchapi = async () => {
    setloading(true)
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`

    try {
      let res = await fetch(url);
      let data = await res.json();
      
      seterrors("")
      setcityname(data.name)
      setdescribe(data.weather[0].description)
      setcelsius(Math.round((data.main.temp) - 273.15))
      setlat(data.coord.lat)
      setlong(data.coord.lon)
      setfeels(Math.round((data.main.feels_like) - 273.15))
      sethumidity(data.main.humidity)
      setvisible((data.visibility) / 1000)
      setair(data.wind.speed)
      setsunrise(convertmilliseconds(data.sys.sunrise))
      setsunset(convertmilliseconds(data.sys.sunset))
      setmax(Math.round((data.main.temp_max) - 273.15) + 4)
      setmin(Math.round((data.main.temp_min) - 273.15) - 4)

      setactive(!active)
    }
    catch (error) {
      seterrors("* Enter Valid City Name *", error)
    }
    finally {
      setloading(false)
    }
  }

  return (
    <div className="weather">

      <div className="weather_app">

        <div className="date_time">
          <p>{currentdate.toLocaleDateString()}</p>
          <p>{currentdate.toLocaleTimeString()}</p>
        </div>

        <h1>Weather App</h1>

        <div className="entry">
          <input type="text" name="country" placeholder='Enter City Name' onChange={cityhandle}></input>
          <button onClick={fetchapi}><img src={require("./images/search.png")} alt="" /></button>
        </div>
        <div>{loading}</div>
        <div className="errors">
          {errors}
        </div>

        <div className={active ? "fulldetails":"fulldetails1"}>
          <div className="description">
            
            <div className='city_location'>
                <h1>{cityname}</h1>
                <img src={require("./images/location.png")} alt="" />
            </div>

            <img className='weather_img' src={require("./images/weather.png")} alt="" />

            <div className="celsius">
              <h2>{celsius}<sup>°</sup></h2>
              <h3>{describe}</h3>
            </div>
            <div className="day">
              <h3>{days[currentdate.getDay()]}</h3>
              <p>{max}<sup>°</sup>/ {min}<sup>°</sup></p>
            </div>

          </div>

          <div className="details">

            <h3>Weather Details</h3>
            
            <div className="column1">
              <div className="feels">
                <img src={require("./images/feels.png")} alt="" />
                <p>Feels like</p>
                <span>{feels}<sup>°</sup>C</span>
              </div>
              <div className="humidity">
                <img src={require("./images/humidity.png")} alt="" />
                <p>Humidity</p>
                <span>{humidity} %</span>
              </div>
            </div>

            <div className="column2">
              <div className="latitude">
                <img src={require("./images/latitude.png")} alt="" />
                <p>Latitude</p>
                <span>{lat}</span>
              </div>
              <div className="longitude">
                <img src={require("./images/longitude.png")} alt="" />
                <p>Longitude</p>
                <span>{long}</span>
              </div>
            </div>

            <div className="column3">
              <div className="visible">
                <img src={require("./images/visibility.png")} alt="" />
                <p>Visibility</p>
                <span>{visible} Km</span>
              </div>
              <div className="wind_speed">
                <img src={require("./images/windy.png")} alt="" />
                <p>Wind Speed</p>
                <span>{air} Mi/h</span>
              </div>
            </div>
          </div>


          <div className="sun">
            <div className="sun_rise">
              <img src={require("./images/sunrise.png")} alt="" />
              <p>Sunrise</p>
              <span>{sunrise}</span>
            </div>

            <div className='semi_circle'>
              <div className="sun_image"></div>
            </div>

            <div className="sun_set">
              <img src={require("./images/sunset.png")} alt="" />
              <p>Sunset</p>
              <span>{sunset}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather