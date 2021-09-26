import logo from "./logo.svg";
import "./index.css";
import { useState } from "react";


let parent = [];
parent.parent = null;

// let initialValue = ['a', 'b' ,'c'];
// for(let i = 0; i < 3; i++) {
//   let child = {"name": initialValue[i], "parent" : parent ,"id" : i.toString(), "level": [i], "child" : [] }
//   parent.push(child);
// }

function App() {
 
  const [tasks, setTask] = useState([]);
  const [input, setInput] = useState("");


  console.log("updated tasks", tasks);

  // object creation

  const createNewObj = (name, parent, level)=> {  //level is array contains [0,1,2]

    return {"name": name, "parent" : parent , "level": level, "id": level.toString(), "child" : [] }
  }

  const onAdd = (e) => {
    setTask([...tasks, createNewObj(input, tasks, [tasks.length])])
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

  const onDrop = (e) => {
    e.preventDefault();
    let draggedId = e.dataTransfer.getData("text");
    // console.log(data, "received data");
    // console.log(e.currentTarget.id, "target id")
    if(e.currentTarget.id === draggedId) {
      
    } else {
      // console.log("Different");
      let draggedArrayLevel = draggedId.split(',');
      let droppedArrayLevel = e.currentTarget.id.split(',');
      // console.log(droppedArrayLevel, " = ", draggedArrayLevel);
      let mainClonedTask = [...tasks];




      //remove part
      let draggedArrayLevelLen = draggedArrayLevel.length;
      let i = 0;

      let clonedTask =  mainClonedTask ;
      let removedElement = [];
      while(i < draggedArrayLevelLen){

          //remove 
          if((i+1) == draggedArrayLevelLen ) {
             
              removedElement = clonedTask.splice(draggedArrayLevel[i],1)
          } else {
            if(Array.isArray(clonedTask[draggedArrayLevel[i]])) {
              
              clonedTask[draggedArrayLevel[i]] = [...clonedTask[draggedArrayLevel[i]]] 
             
               clonedTask =  clonedTask[draggedArrayLevel[i]];
            } else { //if its object
              clonedTask[draggedArrayLevel[i]] = {...clonedTask[draggedArrayLevel[i]]}
             
              clonedTask[draggedArrayLevel[i]].child = [...clonedTask[draggedArrayLevel[i]].child];
              clonedTask = clonedTask[draggedArrayLevel[i]].child;
            }
          }
        i++;
      }
      console.log(removedElement[0], "removed element");

      
      
      
      // append part

        let droppedArrayLevelLen = droppedArrayLevel.length;
        clonedTask = mainClonedTask;
        i = 0;

        // console.log(droppedArrayLevel[0], "dropped array level");

        while(i < droppedArrayLevelLen){

          //append 
          if((i+1) == droppedArrayLevelLen ) {
            // console.log(clonedTask, "cloned task");
            // clonedTask.push({...removedElement[0]});
           clonedTask[droppedArrayLevel[i]] = {...clonedTask[droppedArrayLevel[i]]};
           console.log(clonedTask[droppedArrayLevel[i]], "recent obj");
           clonedTask[droppedArrayLevel[i]].child = [...(clonedTask[droppedArrayLevel[i]].child)];

           let newChild = {...removedElement[0]};
           newChild.parent = clonedTask[droppedArrayLevel[i]].child;
           clonedTask[droppedArrayLevel[i]].child.push({...removedElement[0]});
          } else {
            if(Array.isArray(clonedTask[droppedArrayLevel[i]])) {
              clonedTask[draggedArrayLevel[i]] = [...clonedTask[draggedArrayLevel[i]]] 
             
              clonedTask =  clonedTask[draggedArrayLevel[i]];
             
            } else { //if its object
              clonedTask[droppedArrayLevel[i]] = {...clonedTask[droppedArrayLevel[i]]}  
             
               clonedTask[droppedArrayLevel[i]].child = [...clonedTask[droppedArrayLevel[i]].child];
               clonedTask = clonedTask[droppedArrayLevel[i]].child;
            }
          }
        i++;
      }

      
      setTask(mainClonedTask);


      // setTask([...tasks, ])
    }
    // event.target.appendChild(document.getElementById(data));
  }
  return (
    <div className="">
      <div className="mt-10 text-center">
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
      <div className="w-32 h-10 border-4 rounded-md text-center shadow-sm">
        <p>root</p>
      </div>

      {/* drag part */}

      {tasks.map((task, i) => {
          console.log(task.id);
        return (
          <div className="cursor-move ml-6 mt-2  " onDragStart={(e) => {e.dataTransfer.setData('text', task.id)}} onDragOver= {(e) => e.preventDefault()} onDrop={onDrop} draggable  id={task.id} key={task.id}>
           
              <p   className="w-32 h-10 border-4 shadow-sm text-center rounded-md" >
                {task.name}
              </p>
            
          </div>
        );
      })}
    </div>
  );
}

export default App;
