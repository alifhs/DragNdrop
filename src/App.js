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


  const updateNestedComponents = (element) => {

    if(element.child.length > 0) {  //for child updating
      element.child = [...element.child];
      let childArray = element.child;
      let parentIdArr = element.id.split(',');
      
      for(let i = 0; i < childArray.length; i++) { // only update , nothing to remove
        let childIdArr = [...parentIdArr];
        childIdArr.push(i);
        
        childArray[i] = {...childArray[i], id: childIdArr.toString()}  //childArray[i] is an object

        if(childArray[i].child.length > 0) {
          childArray[i].child = [...childArray[i].child];
          let grandChildArr = childArray[i].child;

          for(let i = 0 ;i < grandChildArr.length; i++ ) {
             let grandChildIdArr = [...childIdArr];
             grandChildIdArr.push(i);
             grandChildArr[i] = {...grandChildArr[i], id: grandChildIdArr.toString()}

             if(grandChildArr[i].child.length > 0) {
              grandChildArr[i].child = [...grandChildArr[i].child];
              let ggChildArr = grandChildArr[i].child;
              
              for(let i = 0; i < ggChildArr.length; i++) {
                let ggChildIdArr = [...grandChildIdArr];
                ggChildIdArr.push(i);

                ggChildIdArr[i] = {...ggChildArr[i], id: ggChildIdArr.toString()}

              }

          }
        }

      }
  }
  
}
  }

  // let pp = tasks[0];

  // if((tasks.length > 0)  && tasks[0].child.length == 4) {

  //   pp.child.map((c, i)=> {
  //     if(c.parent == pp) {
  //       console.log('true');
  //     } else {
  //       console.log(false);
  //     }
  //   })

  // }
  // object creation

  // const createNewObj = (name, parent, level)=> {  //level is array contains [0,1,2]

  //   return {"name": name, "parent" : parent , "level": level, "id": level.toString(), "child" : [] }
  // }
  const createNewObj = (name, id) => {
    //level is array contains [0,1,2]

    return { name: name, id: id.toString(), child: [] };
  };
  //id will contain coma separated string that determines its level

  const onAdd = (e) => {
    if(input === ""){}
    else {
    setTask([...tasks, createNewObj(input, [tasks.length])]);
    setInput("");
    }
  };

  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  // MouseDown

  // const onMouseDown = (e)=> {
  //   e.preventDefault();
  //   console.log("mouse down")

  // }

  const onDrop = (e) => {
    e.preventDefault();
    let draggedId = e.dataTransfer.getData("id");
    // console.log(data, "received data");
    // console.log(e.currentTarget.id, "target id")
    if (e.currentTarget.id === draggedId) {

    } else {
      // console.log("Different");
      let draggedArrayLevel = draggedId.split(",");
      let droppedArrayLevel = e.currentTarget.id.split(",");
      // console.log(droppedArrayLevel, " = ", draggedArrayLevel);
      let mainClonedTask = [...tasks];

      //remove part
      let draggedArrayLevelLen = draggedArrayLevel.length;
      let i = 0;

      let clonedTask = mainClonedTask;
      let removedElement = [];
      while (i < draggedArrayLevelLen) {
        //remove
        if (i + 1 == draggedArrayLevelLen) {
          removedElement = clonedTask.splice(draggedArrayLevel[i], 1);

          //update other components id too
          for(let i = 0; i < clonedTask.length; i++){
            let newIdArr = clonedTask[i].id.split(',');
            newIdArr.splice(newIdArr.length - 1, 1);
            newIdArr.push(i);
            clonedTask[i] = {...clonedTask[i], id: newIdArr.toString()}

            //end of update of a single element
            let parentIdArr = [...newIdArr];
            if(clonedTask[i].child.length > 0) {  //for child updating
                clonedTask[i].child = [...clonedTask[i].child];
                let childArray = clonedTask[i].child;
                
                for(let i = 0; i < childArray.length; i++) { // only update , nothing to remove
                  let childIdArr = [...parentIdArr];
                  childIdArr.push(i);
                  
                  childArray[i] = {...childArray[i], id: childIdArr.toString()}  //childArray[i] is an object

                  if(childArray[i].child.length > 0) {
                    childArray[i].child = [...childArray[i].child];
                    let grandChildArr = childArray[i].child;

                    for(let i = 0 ;i < grandChildArr.length; i++ ) {
                       let grandChildIdArr = [...childIdArr];
                       grandChildIdArr.push(i);
                       grandChildArr[i] = {...grandChildArr[i], id: grandChildIdArr.toString()}

                       if(grandChildArr[i].child.length > 0) {
                        grandChildArr[i].child = [...grandChildArr[i].child];
                        let ggChildArr = grandChildArr[i].child;
                        
                        for(let i = 0; i < ggChildArr.length; i++) {
                          let ggChildIdArr = [...grandChildIdArr];
                          ggChildIdArr.push(i);

                          ggChildIdArr[i] = {...ggChildArr[i], id: ggChildIdArr.toString()}

                        }

                    }
                  }

                }
            }
            
          }
        }
        } else {
          if (Array.isArray(clonedTask[draggedArrayLevel[i]])) {
            clonedTask[draggedArrayLevel[i]] = [
              ...clonedTask[draggedArrayLevel[i]],
            ];

            clonedTask = clonedTask[draggedArrayLevel[i]];
          } else {
            //if its object
            clonedTask[draggedArrayLevel[i]] = {
              ...clonedTask[draggedArrayLevel[i]],
            };

            clonedTask[draggedArrayLevel[i]].child = [
              ...clonedTask[draggedArrayLevel[i]].child,
            ];
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

      console.log(droppedArrayLevel[0], "dropped array level");

      while (i < droppedArrayLevelLen) {
        //append
        if (i + 1 == droppedArrayLevelLen) {
          // console.log(clonedTask, "cloned task");
          // clonedTask.push({...removedElement[0]});

          clonedTask[droppedArrayLevel[i]] = {
            ...clonedTask[droppedArrayLevel[i]],
          }; //this is parent
          let parent = clonedTask[droppedArrayLevel[i]];
          //  console.log(clonedTask[droppedArrayLevel[i]], "recent obj");

          //  clonedTask[droppedArrayLevel[i]].child = [...(clonedTask[droppedArrayLevel[i]].child)];
          parent.child = [...parent.child];

          let newChild = { ...removedElement[0] };

          let newChildsPrevId = newChild.id;
          console.log(newChild.id, "new childs prev id");

        
          newChild.id = parent.id + "," + parent.child.length.toString();
          console.log("id : " , newChild.id );
         
          parent.child.push(newChild);
        } else {
          if (Array.isArray(clonedTask[droppedArrayLevel[i]])) {
            clonedTask[draggedArrayLevel[i]] = [
              ...clonedTask[draggedArrayLevel[i]],
            ];

            clonedTask = clonedTask[draggedArrayLevel[i]];
          } else {
            //if its object
            clonedTask[droppedArrayLevel[i]] = {
              ...clonedTask[droppedArrayLevel[i]],
            };

            clonedTask[droppedArrayLevel[i]].child = [
              ...clonedTask[droppedArrayLevel[i]].child,
            ];
            clonedTask = clonedTask[droppedArrayLevel[i]].child;
          }
        }
        i++;
      }

      setTask(mainClonedTask);

      
    }
    // event.target.appendChild(document.getElementById(data));
  };

  
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
      <div className="w-32 h-10 border-4 mt-10 rounded-md text-center shadow-sm">
        <p>root</p>
      </div>
      {/* <div className="mt-10 ml-6 wid"><p>Tasks</p></div> */}

      {/* drag part */}

      {tasks.map((task, i) => {
        console.log(task.id);
        return (
          <div key={task.id}>
            <div
              className="cursor-move ml-6 mt-2  "
              onDragStart={(e) => {
                e.dataTransfer.setData("id", task.id);
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={onDrop}
              draggable
              id={task.id}
              
            >
              <p className="w-32 h-10 border-4 shadow-sm text-center rounded-md">
                {task.name}
              </p>
            </div>

            {task.child.length > 0
              ? task.child.map((ta, i) => {
                  return (
                    <div
                      className="cursor-move ml-12 mt-2   "
                      onDragStart={(e) => {
                        e.dataTransfer.setData("id", ta.id);
                      }}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={onDrop}
                      draggable
                      id={ta.id}
                      key={ta.id}
                    >
                      <p className="w-32 h-10 border-4 shadow-sm text-center rounded-md">
                        {ta.name}
                      </p>
                    </div>
                  );
                })
              : null}
          </div>
        );
      })}
    </div>
  );
}

export default App;
