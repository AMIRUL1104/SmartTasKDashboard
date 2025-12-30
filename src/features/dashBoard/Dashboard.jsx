import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainBox from "./components/MainBox";
import NewTaskField from "./components/NewTaskField";
// grid grid-cols-[250px_1fr] min-h-[calc(100vh-60px)]
import { useState } from "react";

function Dashboard() {
  const [SidebarToggle, setSidebarToggle] = useState(true);
  const [newTaskPageToggle, setNewTaskPageToggle] = useState(false);

  // all tasks or notes stored in this state
  const [allTask, setAllTask] = useState([
    { id: 0, title: "amirul islam", textarea: { 2: "this is first task" } },
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

  return (
    <>
      <Header
        setSidebarToggle={setSidebarToggle}
        setNewTaskPageToggle={setNewTaskPageToggle}
        newTaskPageToggle={newTaskPageToggle}
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
              setNewTaskPageToggle={setNewTaskPageToggle}
            />
          )
        }
        {newTaskPageToggle ? (
          <NewTaskField
            addTask={addTask}
            setNewTaskPageToggle={setNewTaskPageToggle}
          />
        ) : (
          <MainBox allTask={allTask} />
        )}
      </main>
    </>
  );
}

export default Dashboard;
