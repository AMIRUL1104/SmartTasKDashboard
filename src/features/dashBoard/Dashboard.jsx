import Sidebar from "./components/Sidebar"; // Sidebar component import (left side navigation area)
import MainBox from "./components/MainBox"; // Main task list display section
import NewTaskField from "./components/NewTaskField"; // New task create/edit form component
import TaskDetails from "./components/TaskDetails"; // Single task details view component
import { useState, useReducer, useEffect } from "react"; // React hooks for state and lifecycle management

// Initial global state for useReducer
const initialValue = {
  // allTask → all tasks stored in localStorage (persistent storage)
  allTask: JSON.parse(localStorage.getItem("userTasks")) || [],

  // visibleTasks → filtered/sorted tasks that will be shown in UI
  visibleTasks: JSON.parse(localStorage.getItem("userTasks")) || [],

  // filters → control panel for filtering, sorting, searching
  filters: {
    category: "all",
    status: "all",
    priority: "all",
    sort: "new-old",
    search: "",
  },
};

// Reducer function → central state management logic
function reducer(state, action) {
  switch (action.type) {
    // Filter by category
    case "SET_CATEGORY": {
      const filteredCategory = action.payload;
      return {
        ...state,
        filters: {
          ...state.filters,
          filteredCategory, // update selected category filter
        },

        // Update visibleTasks based on category
        visibleTasks:
          filteredCategory === "all"
            ? state.allTask
            : state.allTask.filter(
                (item) => item.category === filteredCategory,
              ),
      };
    }

    // Filter by status
    case "SET_STATUS": {
      const filteredStatus = action.payload;
      return {
        ...state,
        filters: {
          ...state.filters,
          filteredStatus, // update selected status filter
        },

        // Update visibleTasks based on status
        visibleTasks:
          filteredStatus === "all"
            ? state.allTask
            : state.allTask.filter((item) => item.status === filteredStatus),
      };
    }

    // Filter by priority
    case "SET_PRIORITY": {
      const filteredPriority = action.payload;
      return {
        ...state,
        filters: {
          ...state.filters,
          filteredPriority, // update selected priority filter
        },

        // Update visibleTasks based on priority
        visibleTasks:
          filteredPriority === "all"
            ? state.allTask
            : state.allTask.filter(
                (item) => item.priority === filteredPriority,
              ),
      };
    }

    // Sort visible tasks
    case "SET_SORT": {
      const filteredSort = action.payload;

      // clone visibleTasks to avoid mutating original state
      let sortedTasks = [...state.visibleTasks];

      // newest → oldest
      if (filteredSort === "new-old") {
        sortedTasks.sort((a, b) => new Date(b.date) - new Date(a.date));
      }

      // oldest → newest
      else if (filteredSort === "old-new") {
        sortedTasks.sort((a, b) => new Date(a.date) - new Date(b.date));
      }

      // sort by priority (custom ranking)
      else if (filteredSort === "priority") {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        sortedTasks.sort(
          (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority],
        );
      }

      // sort by status (custom ranking)
      else if (filteredSort === "status") {
        const statusOrder = { pending: 1, "in-progress": 2, completed: 3 };
        sortedTasks.sort(
          (a, b) => statusOrder[a.status] - statusOrder[b.status],
        );
      }

      // if no valid sort selected
      else {
        sortedTasks = state.visibleTasks;
      }

      return {
        ...state,
        filters: {
          ...state.filters,
          filteredSort, // update selected sort option
        },
        visibleTasks: sortedTasks, // apply sorted result
      };
    }

    // Search by task title
    case "SET_SEARCH": {
      const filteredSearch = action.payload;
      return {
        ...state,
        filters: {
          ...state.filters,
          filteredSearch, // update search keyword
        },

        // Filter tasks based on title match
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

    // Delete a task
    case "SET_DELETETASK": {
      const deleteTask = action.payload;

      return {
        ...state,

        // remove from allTask
        allTask: state.allTask.filter((item) => item.id !== deleteTask),

        // remove from visibleTasks
        visibleTasks: state.visibleTasks.filter(
          (item) => item.id !== deleteTask,
        ),
      };
    }

    // Add new task
    case "SET_NEWTASK": {
      const newTask = action.payload;

      return {
        ...state,
        // push new task into allTask
        allTask: [...state.allTask, newTask],

        // push new task into visibleTasks
        visibleTasks: [...state.visibleTasks, newTask],
      };
    }

    // Update task status (e.g., pending → completed)
    case "SET_TASK_STATUS": {
      const { id, status } = action.payload;

      // map through tasks and update matching id
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
        visibleTasks: updatedTasks, // sync visibleTasks with updated data
      };
    }

    default:
      return state; // fallback
  }
}

function Dashboard() {
  // Sidebar visibility (responsive control)
  const [SidebarToggle, setSidebarToggle] = useState(() => {
    if (window.innerWidth < 1024) {
      return false; // hide sidebar on small screens
    }
    return true;
  });

  // Controls which main section is active (mainbox / newTaskPage / taskDetails)
  const [mainSectionToggle, setMainSectionToggle] = useState("mainbox");

  // Stores current selected task id for details view
  const [currentTaskDetails, setCurrentTaskDetails] = useState(null);

  // Stores task object for editing
  const [currentEditTask, setCurrentEditTask] = useState(null);

  // Drawer (delete confirmation modal) visibility
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Selected task for deletion
  const [selectedItem, setSelectedItem] = useState(null);

  // Global state management via useReducer
  const [headState, dispatch] = useReducer(reducer, initialValue);

  // Sync allTask with localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("userTasks", JSON.stringify(headState.allTask));
  }, [headState.allTask]);

  // Add or update task function
  const addTask = ({ title, category, status, priority, textarea }) => {
    // Prevent empty title
    let taskTitle = title.trim().length > 0 ? title : "untitled document";

    // If editing existing task
    if (currentEditTask) {
      let updatedTask = {
        ...currentEditTask,
        taskTitle,
        category,
        status,
        priority,
        textarea,
        date: new Date().toISOString(), // update timestamp
      };

      // Remove old version
      dispatch({ type: "SET_DELETETASK", payload: currentEditTask.id });

      // Add updated version
      dispatch({ type: "SET_NEWTASK", payload: updatedTask });

      setCurrentEditTask(null); // reset edit state
      return;
    }

    // Create new task object
    let addNewTask = {
      id: crypto.randomUUID(), // unique id
      taskTitle,
      category,
      status,
      priority,
      textarea,
      date: new Date().toISOString(), // creation date
    };

    // Dispatch add action
    dispatch({ type: "SET_NEWTASK", payload: addNewTask });
  };

  // Open delete confirmation drawer
  const openDeleteDrawer = (e) => {
    const id = e.target.id;
    setIsDrawerOpen(true);

    // find selected task
    let item = headState.allTask.find((e) => {
      return e.id == id;
    });

    setSelectedItem(item);
  };

  // Close drawer and reset selected item
  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedItem(null);
  };

  // Show task details page
  const handleTaskShowing = (e) => {
    const id = e.target.id;
    setCurrentTaskDetails(id);
    setMainSectionToggle("taskDetails");
  };

  // Handle edit button click
  const handleEdit = (e) => {
    const id = e.target.id;

    // find task to edit
    const editItem = headState.allTask.find((e) => {
      return e.id === id;
    });

    setCurrentEditTask(editItem);
    setMainSectionToggle("newTaskPage"); // switch to edit form
  };

  // Conditional rendering of main content section
  let content;

  if (mainSectionToggle === "newTaskPage") {
    // Render New Task Form
    content = (
      <NewTaskField
        addTask={addTask}
        setMainSectionToggle={setMainSectionToggle}
        currentEditTask={currentEditTask}
        SidebarToggle={SidebarToggle}
        setSidebarToggle={setSidebarToggle}
      />
    );
  } else if (mainSectionToggle === "taskDetails") {
    // Render Task Details Page
    content = (
      <TaskDetails
        allTask={headState.allTask}
        dispatch={dispatch}
        currentTaskDetails={currentTaskDetails}
        handleEdit={handleEdit}
        SidebarToggle={SidebarToggle}
        setSidebarToggle={setSidebarToggle}
      />
    );
  } else {
    // Default → Render Main Task List
    content = (
      <MainBox
        allTask={headState.visibleTasks} // filtered/sorted tasks
        handleTaskShowing={handleTaskShowing}
        dispatch={dispatch}
        openDeleteDrawer={openDeleteDrawer}
        handleEdit={handleEdit}
        SidebarToggle={SidebarToggle}
        setSidebarToggle={setSidebarToggle}
      />
    );
  }

  // JSX return → layout structure + sidebar + drawer
  return (
    <>
      {/* Main Layout Container */}
      <main
        className={`max-md:relative h-[99.99vh] overflow-clip bg-cyan-950 ${
          SidebarToggle ? "grid grid-cols-[250px_1fr]" : "flex-1"
        }`}
      >
        {/* Sidebar (conditionally rendered) */}
        {SidebarToggle && (
          <Sidebar
            SidebarToggle={SidebarToggle}
            setSidebarToggle={setSidebarToggle}
            allTask={headState.visibleTasks}
            handleTaskShowing={handleTaskShowing}
            dispatch={dispatch}
            setMainSectionToggle={setMainSectionToggle}
            mainSectionToggle={mainSectionToggle}
          />
        )}

        {/* Dynamic main content */}
        {content}
      </main>

      {/* Background overlay when drawer open */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-slate-900 opacity-50 z-40 transition-opacity"
          onClick={closeDrawer}
        />
      )}

      {/* Delete Confirmation Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 pointer-events-auto transform transition-all duration-300 scale-100 opacity-100">
            {/* Delete action buttons */}
            <button
              onClick={() => {
                dispatch({
                  type: "SET_DELETETASK",
                  payload: selectedItem.id,
                });
                closeDrawer();
              }}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard; // Export Dashboard component
