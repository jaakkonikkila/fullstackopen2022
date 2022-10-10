import { useState, useEffect } from 'react'
import personService from './services/Persons'
import Filter from './Filter'
import PersonForm from './PersonForm'
import PrintPersons from './PrintPersons'
import Notification from './Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  // handles the deletion of person
  const handleDelete = (event) => {
    if(window.confirm(`Delete ${event.target.name} ?`)) {
      personService
      .remove(event.target.id)
        .then(() => {
          setMessage(
            `Successfully deleted ${event.target.name}`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          personService
              .getAll()
                .then(persons => {
                  setPersons(persons)
                })
        })
      .catch(error => {
        setErrorMessage(
          `Information of ${event.target.name} has already been removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          personService
              .getAll()
                .then(persons => {
                  setPersons(persons)
                })
      })
    }
  }
  

  // adds person or updates the number if person is already added
  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name : newName,
      number : newNumber
    }
    
    if(persons.map(person => person.name.toLowerCase()).includes(newName.toLowerCase())) {
      if(window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`)){
          const oldPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
          personService
          .update(oldPerson.id, newPerson)
            .then(() => {
              setMessage(`Updated number of ${newName}`)
              setNewName('')
              setNewNumber('')
              setTimeout(() => {
                setMessage(null)
              }, 5000)
              personService
              .getAll()
                .then(persons => {
                  setPersons(persons)
            })
          })
      }
      return
    }

    personService
    .create(newPerson)
      .then(returnedPerson => {
        setMessage(`Added ${newName}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
    })
  }

  const personsToShow = newFilter === '' 
    ? persons
    : persons.filter(person => person.name.toString().toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type='success' />
      <Notification message={errorMessage} type='error' />
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm onSubmit={addPerson} nameValue={newName} nameChange={handleNameChange} 
      numberValue={newNumber} numberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <PrintPersons persons={personsToShow} deletePerson={handleDelete} />
    </div>
  )

}

export default App
