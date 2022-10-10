import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter'
import CountriesToShow from './CountriesToShow'

function App() {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const countriesToShow = newFilter === '' 
    ? countries
    : countries.filter(country => country.name.common.toString().toLowerCase().includes(newFilter.toLowerCase()))
  
  return (
    <div>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <CountriesToShow initial_countries={countriesToShow} />
    </div>
  );


}

export default App;
