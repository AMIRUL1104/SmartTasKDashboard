import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainBox from "./components/MainBox";
import NewTaskField from "./components/NewTaskField";
import TaskDetails from "./components/TaskDetails";
import { useState, useEffect } from "react";
function Dashboard() {
  const [SidebarToggle, setSidebarToggle] = useState(true);
  const [mainSectionToggle, setMainSectionToggle] = useState("mainbox");
  const [currentTaskDetails, setCurrentTaskDetails] = useState(null);
  // all tasks or notes stored in this state
  const [allTask, setAllTask] = useState(() => {
    let userTasks = localStorage.getItem("userTasks");
    return userTasks ? JSON.parse(userTasks) : [];
  });
  const [visibleTasks, setVisibleTasks] = useState(allTask);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); //for delete

  // storing all tasks in local storage whenever allTask state changes
  useEffect(() => {
    localStorage.setItem("userTasks", JSON.stringify(allTask));
  }, [allTask]);

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

    setVisibleTasks([...visibleTasks, addNewTask]);
    setAllTask([...allTask, addNewTask]);
  };

  // delete drawer functions
  const openDeleteDrawer = (e) => {
    const id = e.currentTarget.id;

    let item = allTask.find((e) => {
      return e.id === id;
    });

    setSelectedItem(item);
    setIsDrawerOpen(true);
  };
  // close drawer function
  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedItem(null);
  };
  // delete task function
  const handleDeleteTask = () => {
    // const id = e.currentTarget.id;
    const updated = allTask.filter((item) => {
      return item.id !== selectedItem.id;
    });

    setVisibleTasks(updated);
    setAllTask(updated);

    closeDrawer();
    // console.log(id);
  };

  // handleTaskShowing function
  const handleTaskShowing = (e) => {
    const id = e.target.id;
    setCurrentTaskDetails(id);
    setMainSectionToggle("taskDetails");
  };

  //  handle filtering function
  const handleFiltering = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (value === "all") return setVisibleTasks(allTask);

    if (name === "taskSearch") {
      setVisibleTasks(
        allTask.filter((item) =>
          item.taskTitle.toLowerCase().includes(value.toLowerCase()),
        ),
      );
      return;
    }
    setVisibleTasks(allTask.filter((item) => item[name] === value));
  };

  // main section conditional rendering
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
        allTask={allTask}
        setAllTask={setAllTask}
        currentTaskDetails={currentTaskDetails}
      />
    );
  } else {
    content = (
      <MainBox
        allTask={visibleTasks}
        handleFiltering={handleFiltering}
        handleTaskShowing={handleTaskShowing}
        openDeleteDrawer={openDeleteDrawer}
      />
    );
  }

  return (
    <>
      <Header
        handleFiltering={handleFiltering}
        setSidebarToggle={setSidebarToggle}
        setNewTaskPageToggle={setMainSectionToggle}
        newTaskPageToggle={mainSectionToggle}
      />

      <main
        className={` ${
          SidebarToggle ? "grid grid-cols-[250px_1fr] min-h-dvh " : " flex-1"
        }`}
      >
        {
          /* Sidebar Component */
          SidebarToggle && (
            <Sidebar
              SidebarToggle={SidebarToggle}
              setNewTaskPageToggle={setMainSectionToggle}
              allTask={visibleTasks}
              handleTaskShowing={handleTaskShowing}
              handleFiltering={handleFiltering}
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
                  onClick={handleDeleteTask}
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
