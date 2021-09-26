import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";


let parent = [];
parent.parent = null;

let initialValue = ['a', 'b' ,'c'];
for(let i = 0; i < 3; i++) {
  let child = {"name": initialValue[i], "parent" : parent ,"id" : i.toString(), "level": [i], "child" : [] }
  parent.push(child);
}

function App() {
 
  const [tasks, setTask] = useState(parent);
  const [input, setInput] = useState("");


  // object creation

  const createNewObj = (name, parent, level)=> {  //level is object contains nested props i=0, j = 1, k = 2

    return {"name": name, "parent" : parent , "level": level, "id": level.toString(), "child" : [] }
  }

  const onAdd = (e) => {
    setTask([...tasks, createNewObj(input, tasks, [tasks.length-1])])
    setInput("");
  };

  
  
  const onInputChange = (e) => {
    setInput(e.target.value);
  };


  // MouseDown

  const onMouseDown = (e)=> {
    e.preventDefault();
    console.log("mouse down")

  }
  return (
    <div className="App">
      <div className="mt-10">
        <input
          value={input}
          onChange={onInputChange}
          type="text"
          className="border-2"
        />{" "}
        <button className="bg-gray-700 w-14 text-white" onClick={onAdd}>
          Add
        </button>
      </div>
      <div>
        <p>root</p>
      </div>
      {tasks.map((task, i) => {
        {/* console.log(task.parent[0].name) */}
        return (
          <div className="flex cursor-move" id={task.id} key={task.id}>
            <div className="h-4 w-4 cursor-move" draggable onDragStart={()=>{ console.log("dragging")}} onMouseDown={onMouseDown}>
              -
            </div>
              <p   className="w-32 h-10 border-4 shadow-sm" >
                {task.name}
              </p>
            
          </div>
        );
      })}
    </div>
  );
}

export default App;
