const Header = ({ course }) => <h2>{course}</h2>
  
const Total = ({ course }) => {
const sum = course.parts.map(part => part.exercises).reduce((p, c) => p + c)
return (
    <b>total of exercises {sum}</b>
)
}

const Part = ({ part }) => 
<p>
    {part.name} {part.exercises}
</p>

const Content = ({ parts }) => parts.map(part => <Part key={part.id} part={part} />)

const Course = ({course}) => {
    return(
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total course={course} />
      </div>
    )
  }
  
export default Course