import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainBox from "./components/MainBox";
import NewTaskField from "./components/NewTaskField";
// grid grid-cols-[250px_1fr] min-h-[calc(100vh-60px)]
import { useState } from "react";

function Dashboard() {
  const [SidebarToggle, setSidebarToggle] = useState(true);
  const [newTaskPageToggle, setNewTaskPageToggle] = useState(false);

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
          <NewTaskField setNewTaskPageToggle={setNewTaskPageToggle} />
        ) : (
          <MainBox />
        )}
      </main>
    </>
  );
}

export default Dashboard;
