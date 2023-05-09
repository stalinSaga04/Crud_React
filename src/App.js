import React from 'react'
import './App.css';
import { useEffect ,useState} from 'react';

import Axios from 'axios';
import "./App.css"

function App() {
  const [id,setId] = useState([""])
  const [name,setName] = useState("");
  const [age,setAge] = useState(0);
  const [email,setEmail] = useState("");
  const [salary,setSalary] = useState(0);
  const [position,setPosition] = useState("");
  const [updated,setUpdated] = useState({id:"",name:"",age:"",email:"",salary:"",position:""});
  
  
  useEffect(()=>{
    loadData();
  },[])
// get employees from API
  const loadData = async ()=>{
    const res = await Axios.get("http://localhost:5000/employees");
    console.log(res.data)
    setId(res.data)
    setName(res.data)
    setAge(res.data)
    
    setEmail(res.data)
    setSalary(res.data)
    setPosition(res.data)
    
  }
  // Add employees
  const addUser = (e) => {
    e.preventDefault();
    console.log(name,age,email,salary,position)
    Axios.post('http://localhost:5000/employees',{ name,age,email,salary,position}).then(()=> {
      setName("");setAge("");setEmail("");setSalary("");setPosition("");
    }).catch((err) => {
      console.log(err);
    })
  }
  //delete employees
const deleteUser = (id)=> {
Axios.delete(`http://localhost:5000/employees/${id}`
);

}
//update employees
const updateUser = ()=> {
  console.log(updated.id,updated.name,updated.age,updated.email,updated.salary,updated.position);
  Axios.put(`http://localhost:5000/employees/${updated.id}`,{
    id:updated.id,name:updated.name,age:updated.age,email:updated.email,salary:updated.salary
  }).then((response) => {
    console.log(response);
  }).catch((err) =>{console.log(err)})
  setTimeout(()=> {
    loadData();
  },500)
}
  
  return (
    <div className="information">
      <form onSubmit={console.log(name)}>
        <h2 > employees</h2>
       
        <label> name </label>
        <input type="text" name="Name" onChange={(e) => setName(e.target.value)}></input>       
        <label> Age </label>      
        <input type="number" name="age" onChange={(e) => setAge(e.target.value)}></input>      
        <label> Email </label>    
        <input type="email" name="email" onChange={(e) => setEmail(e.target.value)}></input>        
        <label> Salary </label>        
        <input type="number" name="salary" onChange={(e) => setSalary(e.target.value)}></input>        
        <label> Position </label>        
        <input type="text" name="position" onChange={(e) => setPosition(e.target.value)}></input>

        <div className='sub-btn'>
        <button onClick={addUser}> add employees</button>
        </div>

       
      </form>
     
    <div className='app'>
    {id.map((e => {
      return(
      <div key={id}> 
      <div className='box-b'> 
          {e.id}{e.name} { e.age} {e.email} {e.salary} {e.position} <button onClick={()=> {deleteUser(e.id)

          }}> delete </button>
          <div>
            <div className='box-c'>
            <input type = "text" placeholder = "enter update name" onChange={e => setUpdated({...updated,name:e.target.value})}/>
            <input type = "number" placeholder = "enter update age" onChange={e => setUpdated({...updated,age:e.target.value})}/>
            <input type = "text" placeholder = "enter update email" onChange={e => setUpdated({...updated,email:e.target.value})}/>
            <input type = "number" placeholder = "enter update salary" onChange={e => setUpdated({...updated,salary:e.target.value})}/>
            <input type = "text" placeholder = "enter update position" onChange={e => setUpdated({...updated,position:e.target.value})}/>
            <button onClick={updateUser}> update </button>
            </div>
            </div>

        </div>
        </div>
      );
    }))}
 </div>
</div>
  );
  
}

export default App;
