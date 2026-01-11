import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainBox from "./components/MainBox";
import NewTaskField from "./components/NewTaskField";
import TaskDetails from "./components/TaskDetails";
// grid grid-cols-[250px_1fr] min-h-[calc(100vh-60px)]
import { useState } from "react";

function Dashboard() {
  const [SidebarToggle, setSidebarToggle] = useState(true);
  const [mainSectionToggle, setMainSectionToggle] = useState("mainbox");
  const [currentTaskDetails, setCurrentTaskDetails] = useState(null);
  // all tasks or notes stored in this state
  const [allTask, setAllTask] = useState([
    {
      id: "0",
      title: " SmartTask CRM Dashboard ",
      textarea: [
        { id: "2", value: "See how to use smartTas CRM Dashboard effectivly " },
      ],
    },
  ]);

  const addTask = ({ title, cetagory, status, priority, textarea }) => {
    let addNewTask = {
      id: crypto.randomUUID(),
      title,
      cetagory,
      status,
      priority,
      textarea,
    };

    setAllTask([...allTask, addNewTask]);
  };

  // handleTaskShowing function
  const handleTaskShowing = (e) => {
    const id = e.target.id;
    allTask.filter((item) => {
      if (item.id === id) {
        setCurrentTaskDetails(item);
        console.log(item);
      }
    });

    // setCurrentTaskDetails(clickedTask);

    setMainSectionToggle("taskDetails");
  };

  // console.log(currentTaskDetails);

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
    content = <TaskDetails currentTaskDetails={currentTaskDetails} />;
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

/* {newTaskPageToggle ? (
          <NewTaskField
            addTask={addTask}
            setNewTaskPageToggle={setNewTaskPageToggle}
          />
        ) : (
          <MainBox allTask={allTask} handleTaskShowing={handleTaskShowing} />
        )} */
