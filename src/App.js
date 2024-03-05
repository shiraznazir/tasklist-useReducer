import { useEffect, useReducer, useRef, useState } from "react";
import "./App.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return [...state, action.payload];
    case "edit":
      const data = state.filter((task) => task.id !== action.payload.id);
      return [
        ...data,
        {
          id: action.payload.id,
          task: action.payload.task,
          isCompleted: action.payload.isCompleted,
        },
      ];
    case "delete":
      const filterData = state.filter((task) => task.id !== action.payload.id);
      return [...filterData];
    case "default":
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, []);
  const [editData, setEditData] = useState("");
  const inputRef = useRef(null);
  const [inCompleteTask, setInCompleteTask] = useState([]);
  const [completeTask, setCompleteTask] = useState([]);

  const handleEdit = (item) => {
    setEditData(item);
    inputRef.current.value = item.task;
  };

  const handleDelete = (ids) => {
    dispatch({
      type: "delete",
      payload: { id: ids },
    });
  };

  const generateUniqueId = (length) => {
    let uniqueId = "task";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    for (let i = 0; i < length; i++) {
      let randomIndex = Math.floor(Math.random() * characters.length);
      uniqueId += characters[randomIndex];
    }
    return uniqueId;
  };

  const handleTaskDone = (item) => {
    dispatch({
      type: "edit",
      payload: { id: item.id, task: item.task, isCompleted: !item.isCompleted },
    });
  };

  const handleTask = () => {
    if (inputRef.current.value) {
      let id = generateUniqueId(10);
      dispatch({
        type: editData?.id ? "edit" : "add",
        payload: {
          id: editData?.id ? editData.id : id,
          task: inputRef.current.value,
          isCompleted: editData?.id ? editData?.isCompleted : false,
        },
      });
      setEditData("");
    } else {
      alert("Please enter the task");
    }
    inputRef.current.value = "";
  };

  useEffect(() => {
    const inCompelete = state.filter((item) => !item.isCompleted);
    setInCompleteTask(inCompelete);

    const complete = state.filter((item) => item.isCompleted);
    setCompleteTask(complete);
  }, [state]);

  console.log("Incomplete", inCompleteTask);
  console.log("Complete", completeTask);

  return (
    <div className="App">
      <h1>Task List</h1>
      <input ref={inputRef} type="text" />
      <button onClick={handleTask}>{editData ? "Update" : "Add"}</button>
      <div className="main">
        <div className="container">
          <div className="childDiv">
            {inCompleteTask && <h2>In complete Task</h2>}
            {inCompleteTask.map((item) => (
              <div className="item" key={item.id}>
                <h3>{item.task}</h3>
                <button className="btn" onClick={() => handleEdit(item)}>
                  Edit
                </button>
                <button className="btn" onClick={() => handleDelete(item.id)}>
                  Delete
                </button>
                <button className="btn" onClick={() => handleTaskDone(item)}>
                  Complete
                </button>
              </div>
            ))}
          </div>
          <div className="childDiv">
            {completeTask && <h2>Complete Task</h2>}
            {completeTask.map((item) => (
              <div className="item" key={item.id}>
                <h3>{item.task}</h3>
                <button className="btn" onClick={() => handleEdit(item)}>
                  Edit
                </button>
                <button className="btn" onClick={() => handleDelete(item.id)}>
                  Delete
                </button>
                <button className="btn" onClick={() => handleTaskDone(item)}>
                  InComplete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
