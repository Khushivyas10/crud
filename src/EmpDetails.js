import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './App.css'


const EmpDetails = () => {
  
  const{empid} = useParams()
  const[empdata,empdatachange]=useState({})
  console.log(empdata);

  
  useEffect(() =>{
    fetch("http://localhost:8000/employee/" +empid).then((res) => {
      return res.json();

  }).then((resp) => {
      console.log(resp)
      empdatachange(resp)
  }).catch((err) => {
          console.log(err.message)
      })
  },[])

  //const si =[]
   const s = [empdata.skill]
   console.log('empdetail',{s})
   
   //const sk = s.map(e => e.map(e => Object.fromEntries(e) ))
  //  console.log('skill',si)
  //  const si = [empdata.skill[0].value]
  //  console.log('si',si)
  // console.log('si',empdata.skill)
  // const si = s.map(el => Object.fromEntries(el).map(([k,v]) =>[k,Object.values(v)[0]]))
  // console.log({si})

  return (
    <div style={{textAlign : 'left'}}>
      { empdata &&
        <div>
        {/* <h5> Name :<b>{empdata.name} ({empdata.id})</b> </h5>
        <h5> About : </h5> {empdata.description}
        <h5> Known Language : </h5> {empdata.language}
        <h5> Joining Details: </h5> {empdata.date} ({empdata.time})
        <h5> Hobbies : </h5> {empdata.hobby}
        <h5> Gender: </h5> {empdata.gender}
        <h5> Contact details : </h5>
        <h6> Email is :{empdata.email}</h6>
        <h6> Phone is :{empdata.phone}</h6> */}
        {/* <Link to ='/' className='btn btn-success'> Back </Link> */}
        <table width='100%' >
          <tbody>
          <tr >
            <th> Name :</th>
            <td> {empdata.name}</td>
          </tr>
          <tr>
            <th> ID :</th>
            <td> {empdata.id}</td>
          </tr>
          <tr>
            <th> About :</th>
            <td> {empdata.description}</td>
          </tr>
          <tr>
            <th> Known Language :</th>
            <td> {empdata.language}</td>
          </tr>
          <tr>
            <th> Joining Details :</th>
            <td> {empdata.date} {empdata.time}</td>
          </tr>
          <tr>
            <th> Hobbies :</th>
            <td> {empdata.hobby }</td>
          </tr>
          <tr>
            <th> Gender :</th>
            <td> {empdata.gender}</td>
          </tr>
          <tr>
            <th> Email-id :</th>
            <td> {empdata.email}</td>
          </tr>
          <tr>
            <th> Contact Number :</th>
            <td> {empdata.phone}</td>
          </tr>
          <tr>
            <th> Skills :</th>
            <td> {empdata?.skill?.map(element => {
              return(
              
                element.value
              )

            })} </td>
          </tr>
          </tbody>
        </table>
        <Link to ='/' className='btn btn-success'> Back </Link>
        </div>
      }
    </div>
  )
}
export default EmpDetails   