import React from 'react';

const Notification = (props) => {
   const green = {
     border: '2px solid green',
     backgroundColor: 'green',
     borderRadius: '5px',
     color: 'white',
     padding: 5
   }

   const red = {
     border: '2px solid red',
     backgroundColor: 'red',
     borderRadius: '5px',
     color: 'white',
     padding: 5
   }
 
   if (props.name === null && props.action === null) return
   if (props.action === "added") {
     return (
       <div style = {green}>
         {props.name} was {props.action}
       </div>
     )
   }
   if (props.action === "deleted"){
     return (
       <div style = {red}>
         {props.name} was {props.action}
       </div>
     )
   }
   if (props.action === "error") {
     return (
      <div style = {red}>
        {props.name}
      </div>
     )
   }
 }

export default Notification