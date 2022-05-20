import Part from './Part'


const Content = (props) => {
   return (
     <div>
        {props.parts.map((entry) => <Part key = {entry.id} name = {entry.name} exercises = {entry.exercises} />)}
     </div>
   )
 }

export default Content