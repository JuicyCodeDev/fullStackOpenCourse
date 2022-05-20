import { useState, useEffect } from 'react'
import axios from 'axios'

const UserInput = (props) => {

  return (
    <div>
      Find countries <input onChange = {props.updateFunction} /> 
    </div>
  )
}

const DisplayCountries = (props) => {

  let fullCountryInfos = null
  const showFullCountry = (event) => {
    const entry = event.target.value
    const languages = []
    console.log(event.target)
    for (let key in entry.languages) {
      languages.push(<li>{entry.languages[key]}</li>)
    }
    fullCountryInfos = (
      <div>
        <h1>{entry.name.common}</h1>
        <p>capital: {entry.capital}</p>
        <p>area: {entry.area}</p>
        <h3>languages</h3>
        <ul>
          {languages}
        </ul>
        <img src = {entry.flags.png} />
      </div>
    )
    return fullCountryInfos
  }

  const matches = props.countryData.filter((country) => country.name.common.toLowerCase().includes(props.userInput.toLowerCase()))

  if (matches.length > 10) {
    return (
      <p>
        Too many matches, specify another filter
      </p>
    )
  }

  else if (matches.length > 1) {
  const matchList = matches.map((entry) => <li key = {entry.name.official}>{entry.name.common}<button id = {entry} onClick = {showFullCountry}>show</button></li>)
    return (
      <div>
        <ul>
          {matchList}
        </ul>
          {fullCountryInfos}
      </div>
    )
  }

  else if (matches.length == 1) {
    console.log(matches.capital)
    const languages = []
    for (let key in matches[0].languages) {
      languages.push(<li>{matches[0].languages[key]}</li>)
    }
    return (
      <div>
        <h1>{matches[0].name.common}</h1>
        <p>capital: {matches[0].capital}</p>
        <p>area: {matches[0].area}</p>
        <h3>languages</h3>
        <ul>
          {languages}
        </ul>
        <img src = {matches[0].flags.png} />
      </div>
    )
  }
}

const App = () => {

  const [countryData, setCountryData] = useState([])
  const [userInput, setUserInput] = useState('')
 

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountryData(response.data)
      })
  }

  const updateUserInput = (event) => {
    setUserInput(event.target.value)
  }

  useEffect(hook, []);

  return(
    <div>
      <UserInput updateFunction = {updateUserInput}/>
      <DisplayCountries userInput = {userInput} countryData = {countryData}/>
    </div>
  )

}

export default App