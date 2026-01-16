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

    setVisibleTasks([...visibleTasks, addNewTask]);
    setAllTask([...allTask, addNewTask]);
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
    console.log(value);

    if (value === "all") return setVisibleTasks(allTask);

    if (name === "taskSearch") {
      setVisibleTasks(
        allTask.filter((item) =>
          item.taskTitle.toLowerCase().includes(value.toLowerCase())
        )
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
    </>
  );
}

export default Dashboard;
