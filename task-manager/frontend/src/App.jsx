import React, {useState,useEffect} from 'react';
import {Routes, Route,Link }from 'react-router-dom'
function Home(){
  return <h2>Welcome to Task Manager</h2>;
}
function TaskList(){
  const [tasks,setTasks]=useState([])
}

function taskList(){
  const [tasks,setTasks]=useStates([]);

  useEffect(()=>{
    fetch("http://localhost:5000/tasks")
    .then((res)=>res.json())
    .then((data)=>setTasks(data));
  },[]);

  return (
    <div>
      <h2>All Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

function AddTask(){
  const [title,setTitle]=useState("");
  const handleSubmit=(e)=>{
    e.preventDefault();
    fetch ("http://localhost:5000/tasks",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({title})
    })
  };
  return(
    <div>
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        <input type="text"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        placeholder="Enter task"
        required
        />
      </form>
    </div>
  )
};

function About(){
  return <h2>About This App</h2>;
}

export default function App(){
  return(
    <div>
      <nav style={{marginBottom:"20px"}}>
        <Link to ="/">Home</Link>|{" "}
        <Link to="/tasks">Tasks</Link>|{" "}
        <Link to="/add">Add Tasks</Link>|{" "}
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/add" element={<AddTask/>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>
    </div>
  );
}