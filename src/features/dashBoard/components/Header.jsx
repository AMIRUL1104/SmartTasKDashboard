import WebIcon from "./Header/WebIcon";
import MenuBar from "./Header/MenuBar";
import AddPageBtn from "./reusable_component/AddPageBtn";
import SearchField from "./reusable_component/SearchField";
import RemovePage from "./reusable_component/RemovePage";
import CloseTaskDetails from "./Header/CloseTaskDetails";
function Header({
  setSidebarToggle,
  setNewTaskPageToggle,
  newTaskPageToggle,
  handleFiltering,
}) {
  let content;
  if (newTaskPageToggle === "newTaskPage") {
    content = <RemovePage setNewTaskPageToggle={setNewTaskPageToggle} />;
  } else if (newTaskPageToggle === "taskDetails") {
    content = <CloseTaskDetails setNewTaskPageToggle={setNewTaskPageToggle} />;
  } else {
    content = <AddPageBtn setNewTaskPageToggle={setNewTaskPageToggle} />;
  }
  return (
    <header className=" bg-cyan-950 p-5 py-2 m-0 flex items-center justify-between">
      <div className="flex items-center justify-around">
        <WebIcon />
        <MenuBar setSidebarToggle={setSidebarToggle} />
      </div>
      {/* <h2 className=" text-2xl font-bold">Welcome Amirul</h2> */}
      <div className="flex items-center justify-around gap-4 ">
        {content}

        <SearchField handleFiltering={handleFiltering} />
      </div>
    </header>
  );
}

export default Header;
