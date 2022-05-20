import React from 'react';

const Names = (props) => {
   const names = props.nameList.map((nameEntry) => {
     if(nameEntry.name.toLowerCase().includes(props.filterString.toLowerCase())){
       return <li key = {nameEntry.id}>{nameEntry.name} {nameEntry.number} <button id = {nameEntry.id} onClick = {props.deleteFunction}>delete</button></li>
     }
   })
   return (
     <>
       <ul>
         {names}
       </ul>
     </>
   )
 }

export default Names