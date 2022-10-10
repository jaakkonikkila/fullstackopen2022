import { useState, useEffect} from 'react'
import axios from 'axios'

const PrintWeather = ({data}) => {
    let temp = "not available"
    let wind = "not available"
    let image_URL = ""

    if(data.length !== 0) {
        
        temp = data.main.temp - 273.15
        wind = data.wind.speed
        temp = parseFloat(temp).toFixed(2)
        image_URL = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    }
    return (
        <div>
            <p>temperature {temp} Celsius</p>
            <img src={image_URL} alt="weather_icon"></img>
            <p>wind {wind} m/s</p>
        </div>
    )
}

const GetWeatherData = ({country, api_key}) => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}`)
        .then(response => {
        setData(response.data)
        })
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [country.capital])
    
    return (
        <PrintWeather data={data} />
    )
}

const PrintLanguages = ({languages}) => {
    return(
       <ul>
            {Object.entries(languages).map( ([key, value]) =>  <li key={key}>{value}</li>
                )}
       </ul>
    )
}

const Button = (props) => (
    <button onClick={props.handleClick} data={props.value}>
      {props.text}
    </button>
  )

const CountriesToShow = ({initial_countries}) => {
    const [countries, setCountries] = useState([])
    const api_key = process.env.REACT_APP_API_KEY

    useEffect(() => {
        setCountries(initial_countries)
      }, [initial_countries])

    if(countries.length > 10){
        return (
            <p>too many matches, specify another filter</p>
        )
           
    }
    if(countries.length === 1)
    {
        const country = countries[0]

        return (
            <div>
                <h1>{country.name.common}</h1>
                <p></p>
                <p>capital {country.capital}</p>
                <p>area {country.area}</p>
                <p></p>
                <b>languages:</b>
                <PrintLanguages languages={country.languages} />
                <img src={country.flags.png} alt="flag"></img>
                <h3>Weather in {country.capital}</h3>
                <GetWeatherData country={country} api_key={api_key} />
            </div>
        )
    }
    if(countries.length > 0) {

        return (
            <div>
                {countries.map( (country) => 
                <div key={country.latlng}>{country.name.common} <></>
                <Button handleClick={() => {
                    const newCountries = []
                    newCountries.push(country)
                    setCountries(newCountries)
                }} text="show" data={country.name.common}/>
                </div>)}
            </div>
        )
    }
    
}

export default CountriesToShow;