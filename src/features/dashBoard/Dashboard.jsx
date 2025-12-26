import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainBox from "./components/MainBox";
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
          <div className="mx-8 my-5 text-4xl bg-gray-100 text-gray-950 p-10 rounded-2xl font-bold">
            {" "}
            New Task Page Component
          </div>
        ) : (
          <MainBox />
        )}
      </main>
    </>
  );
}

export default Dashboard;
