import { useState, useEffect } from 'react';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';

//https://www.youtube.com/watch?v=w7ejDZ8SWv8

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(()=>{    
    const getTasks = async() => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  const fetchTasks = async()=>{
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();
    return data;
  }

  const addTask = (task) => {    
    const id = tasks.length + 1;
    const newTask = {id, ...task};
    setTasks([...tasks, newTask]);
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => 
     task.id === id ? {...task, reminder: !task.reminder } : task 
   ))
  }
  

  return (
    <div className="container">
      <Header
        onAdd={()=> setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      {showAddTask && 
        <AddTask
          onAddTask = {addTask}
        />
      }
      {tasks.length > 0 ? (
        <Tasks 
          tasks={tasks} 
          onDelete={deleteTask}
          onToggle = {toggleReminder}/>
      ) : (
        'No Tasks to show'
      )}
    </div>
  );
}

export default App;
