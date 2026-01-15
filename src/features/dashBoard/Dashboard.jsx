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

  useEffect(() => {
    localStorage.setItem("userTasks", JSON.stringify(allTask));
  }, [allTask]);
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

    setAllTask([...allTask, addNewTask]);
  };

  // handleTaskShowing function
  const handleTaskShowing = (e) => {
    const id = e.target.id;
    // allTask.filter((item) => {
    //   if (item.id === id) {
    //     setCurrentTaskDetails(item);
    //     console.log(item);
    //   }
    // });

    // setCurrentTaskDetails(clickedTask);
    setCurrentTaskDetails(id);
    setMainSectionToggle("taskDetails");
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
      <MainBox allTask={allTask} handleTaskShowing={handleTaskShowing} />
    );
  }

  return (
    <>
      <Header
        setSidebarToggle={setSidebarToggle}
        setNewTaskPageToggle={setMainSectionToggle}
        newTaskPageToggle={mainSectionToggle}
      />

      <main
        className={` ${
          SidebarToggle
            ? "grid grid-cols-[250px_1fr] min-h-[calc(100vh-60px)] "
            : " flex-1"
        }`}
      >
        {
          /* Sidebar Component */
          SidebarToggle && (
            <Sidebar
              SidebarToggle={SidebarToggle}
              setNewTaskPageToggle={setMainSectionToggle}
              allTask={allTask}
              handleTaskShowing={handleTaskShowing}
            />
          )
        }
        {content}
      </main>
    </>
  );
}

export default Dashboard;
