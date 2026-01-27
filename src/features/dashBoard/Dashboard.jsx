import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainBox from "./components/MainBox";
import NewTaskField from "./components/NewTaskField";
import TaskDetails from "./components/TaskDetails";
import { useState, useEffect, useReducer } from "react";

const initialValue = {
  allTask: JSON.parse(localStorage.getItem("userTasks")),
  visibleTasks: JSON.parse(localStorage.getItem("userTasks")),
  filters: {
    category: "all",
    status: "all",
    priority: "all",
    sort: "all",
    search: "",
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_CATEGORY": {
      const filteredCategory = action.payload;
      return {
        ...state,
        filters: {
          ...state.filter,
          filteredCategory,
        },

        visibleTasks:
          filteredCategory === "all"
            ? state.allTask
            : state.allTask.filter(
                (item) => item.category === filteredCategory,
              ),
      };
    }
    case "SET_STATUS": {
      const filteredStatus = action.payload;
      return {
        ...state,
        filters: {
          ...state.filter,
          filteredStatus,
        },

        visibleTasks:
          filteredStatus === "all"
            ? state.allTask
            : state.allTask.filter((item) => item.status === filteredStatus),
      };
    }
    case "SET_PRIORITY": {
      const filteredPriority = action.payload;
      return {
        ...state,
        filters: {
          ...state.filter,
          filteredPriority,
        },

        visibleTasks:
          filteredPriority === "all"
            ? state.allTask
            : state.allTask.filter(
                (item) => item.category === filteredPriority,
              ),
      };
    }
    case "SET_SORT": {
      const filteredSort = action.payload;
      return {
        ...state,
        filters: {
          ...state.filter,
          filteredSort,
        },

        visibleTasks:
          filteredSort === "all"
            ? state.allTask
            : state.allTask.filter((item) => item.category === filteredSort),
      };
    }
    case "SET_SEARCH": {
      const filteredSearch = action.payload;
      return {
        ...state,
        filters: {
          ...state.filter,
          filteredSearch,
        },

        visibleTasks:
          filteredSearch === ""
            ? state.allTask
            : state.allTask.filter((item) =>
                item.taskTitle
                  .toLowerCase()
                  .includes(filteredSearch.toLowerCase()),
              ),
      };
    }
    case "SET_DELETETASK": {
      const deleteTask = action.payload;

      return {
        ...state,
        allTask: state.allTask.filter((item) => item.id !== deleteTask),
        visibleTasks: state.visibleTasks.filter(
          (item) => item.id !== deleteTask,
        ),
      };
    }
    case "SET_NEWTASK": {
      const newTask = action.payload;
      return {
        ...state,
        allTask: [...state.allTask, newTask],
        visibleTasks: [...state.visibleTasks, newTask],
      };
    }
    case "SET_TASK_STATUS": {
      const { id, status } = action.payload;
      const updatedTasks = state.allTask.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            status: status,
          };
        }
        return task;
      });
      return {
        ...state,
        allTask: updatedTasks,
        visibleTasks: updatedTasks,
      };
    }
    default:
      return state;
  }
}

function Dashboard() {
  const [SidebarToggle, setSidebarToggle] = useState(() => {
    if (window.innerWidth < 1024) {
      return false;
    }
    return true;
  });
  const [mainSectionToggle, setMainSectionToggle] = useState("mainbox");
  const [currentTaskDetails, setCurrentTaskDetails] = useState(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); //for delete

  // state management using useReducer
  const [headState, dispatch] = useReducer(reducer, initialValue);

  // storing all tasks in local storage whenever allTask state changes
  useEffect(() => {
    localStorage.setItem("userTasks", JSON.stringify(headState.allTask));
  }, [headState.allTask]);

  // add new task function
  const addTask = ({ title, category, status, priority, textarea }) => {
    let taskTitle = title.trim().length > 0 ? title : "untitled document";
    console.log(taskTitle);

    let addNewTask = {
      id: crypto.randomUUID(),
      taskTitle,
      category,
      status,
      priority,
      textarea,
    };

    dispatch({ type: "SET_NEWTASK", payload: addNewTask });
    // return headState.map((item) => {
    //   return {
    //     ...item,
    //     allTask: [...headState.allTask, addNewTask],
    //   };
    // });
    // setVisibleTasks([...visibleTasks, addNewTask]);
    // setAllTask([...allTask, addNewTask]);
  };

  // delete drawer functions
  const openDeleteDrawer = (e) => {
    const id = e.target.id;
    setIsDrawerOpen(true);

    let item = headState.allTask.find((e) => {
      return e.id == id;
    });

    setSelectedItem(item);
  };

  // close drawer function
  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedItem(null);
  };

  // handleTaskShowing function
  const handleTaskShowing = (e) => {
    const id = e.target.id;
    setCurrentTaskDetails(id);
    setMainSectionToggle("taskDetails");
  };

  // conditional rendering of main section
  let content;
  if (mainSectionToggle === "newTaskPage") {
    content = (
      <NewTaskField
        addTask={addTask}
        setNewTaskPageToggle={setMainSectionToggle}
      />
    );
  } else if (mainSectionToggle === "taskDetails") {
    content = (
      <TaskDetails
        allTask={headState.allTask}
        dispatch={dispatch}
        currentTaskDetails={currentTaskDetails}
      />
    );
  } else {
    content = (
      <MainBox
        allTask={headState.visibleTasks}
        handleTaskShowing={handleTaskShowing}
        dispatch={dispatch}
        openDeleteDrawer={openDeleteDrawer}
      />
    );
  }

  return (
    <>
      <Header
        dispatch={dispatch}
        setSidebarToggle={setSidebarToggle}
        setMainSectionToggle={setMainSectionToggle}
        mainSectionToggle={mainSectionToggle}
      />

      <main
        className={`max-md:relative  max-h-[90vh] overflow-auto ${
          SidebarToggle ? "grid grid-cols-[250px_1fr]  " : " flex-1  "
        }`}
      >
        {
          /* Sidebar Component */
          SidebarToggle && (
            <Sidebar
              SidebarToggle={SidebarToggle}
              allTask={headState.visibleTasks}
              handleTaskShowing={handleTaskShowing}
              dispatch={dispatch}
            />
          )
        }
        {content}
      </main>

      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-slate-900 opacity-50 z-40 transition-opacity"
          onClick={closeDrawer}
        />
      )}

      {/* Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
          <div
            className={`bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 pointer-events-auto transform transition-all duration-300 ${
              isDrawerOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            <div className="p-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  Delete Confirmation
                </h2>
                <button
                  onClick={closeDrawer}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  cl
                </button>
              </div>

              {/* Drawer Content */}
              {selectedItem && (
                <div className="mb-6">
                  <p className="text-gray-700 mb-2 text-xl">
                    Are you sure you want to delete this task ?
                  </p>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <h3 className="font-semibold text-red-800">
                      {selectedItem.taskTitle}
                    </h3>
                    <p className="text-sm text-red-600">
                      {selectedItem.textarea.map((e) => {
                        if (e.id === "2") {
                          const text = e.value;
                          const words = text.split(" ");
                          return words.length > 30
                            ? words.slice(0, 30).join(" ") + "  . . ."
                            : text;
                        }
                      })}
                    </p>
                  </div>
                </div>
              )}
              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={closeDrawer}
                  className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    dispatch({
                      type: "SET_DELETETASK",
                      payload: selectedItem.id,
                    });
                    closeDrawer();
                  }}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
