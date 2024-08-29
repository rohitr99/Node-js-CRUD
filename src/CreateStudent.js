import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function CreateStudent() {
    const [ID, setID] = useState("");
    const [namefirst, setnamefirst] = useState("");
  const [namelast, setnamelast] = useState("");
  const [DOB, setDOB] = useState("");
  const [emailID, setemailID] = useState("");
 
  const navigate = useNavigate();


   function handlesubmit(event){
    event.preventDefault();
    axios.post('http://localhost:8000/create',{ID,namefirst,namelast,DOB,emailID})
    .then(res=>{
        console.log(res);
        navigate('/');
    }).catch(err=>console.log(err))
   }


  return (
    <form onSubmit={handlesubmit}>
      <label>
        ID:
        <input type="text" onChange={e=>setID(e.target.value)} />
      </label>
      <label>
        namefirst:
        <input type="text"   onChange={e=>setnamefirst(e.target.value)} />
      </label>

      <label>
        nameLast:
        <input type="text" onChange={e=>setnamelast(e.target.value)} />
      </label>

      <label>
        DOB:
        <input type="date" onChange={e=>setDOB(e.target.value)}/>
      </label>

      <label>
        emailID:
        <input type="email"  onChange={e=>setemailID(e.target.value)}/>
      </label>


      <input type="submit" value="Submit" />

      
    </form>
  )
}

export default CreateStudent;