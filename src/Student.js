import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
function Student() {
    const[student, setStudent] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:8000/')

     .then(res=>setStudent(res.data))
     .catch(err=>console.log(err));
    }, [])


const handledelete = async(ID)=>{
try{
    await axios.delete(`http://localhost:8000/student/${ID}`)
    window.location.reload()
}catch(err){
    console.log(err);
}
}


  return (
    <div>
        <div className="d-flex align-items-center">
        <div class="position-absolute top-0 start-0">
        <button type="button" className="btn btn-success">Add</button>
        </div>

        <div className="position-absolute top-0 start-0">
                    <Link to="/create" className="btn btn-success">Add</Link>
                </div>
            <table className='table'>
                <thead>
                    <th>ID</th>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>DOB</th>
                    <th>Email_id</th>
                </thead>
                <tbody>
                 {
                student.map((data,i)=>(
                    <tr>
                        <td>{data.ID}</td>
                        <td>{data.namefirst}</td>
                        <td>{data.namelast}</td>
                        <td>{data.DOB}</td>
                        <td>{data.emailID}</td>
                        <td>
                            <Link to={`update/${data.ID}`} class="btn btn-primary">Update</Link>
                            <button  className="btn btn-danger" onClick={e=>handledelete(data.ID)}>Delete</button>
                        </td>
                    </tr>
                ))
                   }

                </tbody>
            </table>

        </div>
    </div>
  )
}

export default Student;