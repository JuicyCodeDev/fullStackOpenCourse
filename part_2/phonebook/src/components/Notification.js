import React from 'react';

const Notification = (props) => {
   const style = {
     border: '2px solid green',
     borderRadius: '5px',
     color: 'green',
     padding: 5
   }
 
   if (props.name === null && props.action === null) return
   return (
     <div style = {style}>
       {props.name} was {props.action}
     </div>
   )
 }

export default Notification