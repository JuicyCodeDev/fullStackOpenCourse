import { useState, useEffect } from 'react'
import axios from 'axios'
import service from './services/phone_book'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Names from './components/Names'

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilter] = useState('')
  const [action, setAction] = useState(null)
  const [actionName, setActionName] = useState (null)

  const hook = () => {
    service.getAll()
      .then(response => {
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

  const checkDoubleEntry = () => {
    if (persons.some(ele => ele.name === newName)) return true
  }

  const saveName = (event) => {
    event.preventDefault()
    if(checkDoubleEntry()){
      alert(`${newName} is already added to phonebook`)
      return
      // if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
      //   service.edit(nameObject)
      //     .then((response) => {
      //       setPersons(persons.map((person) => person.id !== newName.id ? person : response.data));
      //     })
      //   return;
      // }
    }
    const nameObject =  {
      name: newName,
      number: newNumber,
    }
    service.create(nameObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        setActionName(nameObject.name)
        setAction('added')
        setTimeout(() => {
          setActionName(null)
          setAction(null)
        }, 5000)
      })
      .catch((error => {
        console.log(error.response.data.error)
        setActionName(error.response.data.error)
        setAction('error')
        setTimeout(() => {
          setActionName(null)
          setAction(null)
        }, 5000)
      }))
  }

  const addName = (event) => {
    setNewName(event.target.value)
  }

  const addNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const filter = (event) => {
    setFilter(event.target.value)
  }

  const deleteName = (event) => {
    for (let person of persons) {
      if (person.id  == event.target.id) {
        if (window.confirm(`Delete ${person.name}?`)) {
          axios.delete(`/api/persons/${event.target.id}`)
          .then(response => {
            setPersons(persons.filter((o) => {
              return o.id !== event.target.id
            }))
            setActionName(person.name)
              setAction("deleted")
              setTimeout(() => {
                setActionName(null)
                setAction(null)
              }, 5000)
          })
        }
      }
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification action = {action} name = {actionName}/>
      <Filter filterString  = {filterString} filter = {filter}/>
      <h2>Add a new</h2>
      <PersonForm saveName = {saveName} newName = {newName} addName = {addName} newNumber = {newNumber} addNumber = {addNumber}/>
      
      <h2>Numbers</h2>
      <Names nameList = {persons} filterString = {filterString} deleteFunction = {deleteName}/>
    </div>
  )
}

export default App