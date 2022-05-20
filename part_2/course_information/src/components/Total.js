const Total = ({ parts }) => {

   const exercises = parts.map(x => x.exercises)
   const total = exercises.reduce((s, p) => s + p, 0)
   return (
      <p>
         <b>total of {total} exercises</b>
      </p>
   )
}

export default Total