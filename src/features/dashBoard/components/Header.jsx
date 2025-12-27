import WebIcon from "./Header/WebIcon";
import MenuBar from "./Header/MenuBar";
import AddPageBtn from "./reusable_component/AddPageBtn";
import SearchField from "./reusable_component/SearchField";
import SaveTaskButton from "./reusable_component/SaveTaskButton";
function Header({ setSidebarToggle, setNewTaskPageToggle, newTaskPageToggle }) {
  return (
    <header className=" bg-cyan-950 p-5 py-2 m-0 flex items-center justify-between">
      <div className="flex items-center justify-around">
        <WebIcon />
        <MenuBar setSidebarToggle={setSidebarToggle} />
      </div>
      <div className="flex items-center justify-around gap-4">
        {newTaskPageToggle ? (
          <SaveTaskButton setNewTaskPageToggle={setNewTaskPageToggle} />
        ) : (
          <AddPageBtn setNewTaskPageToggle={setNewTaskPageToggle} />
        )}

        <SearchField />
      </div>
    </header>
  );
}

export default Header;
