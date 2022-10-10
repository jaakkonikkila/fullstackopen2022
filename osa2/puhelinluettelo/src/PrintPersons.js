const Button = (props) => (
    <button onClick={props.handleClick} data={props.value} name={props.name} id={props.id}>
      {props.text}
    </button>
  )


const Person = ({person, deletePerson}) => {
    return (
        <div>
            {person.name} {person.number} <></> 
            <Button handleClick={deletePerson} text='delete' id={person.id} name={person.name}/>
        </div>
    )
}

const PrintPersons = ({persons, deletePerson}) => persons.map(person => <Person key={person.id} person={person} deletePerson={deletePerson}/>)


export default PrintPersons