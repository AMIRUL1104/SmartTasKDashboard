import WebIcon from "./Header/WebIcon";
import MenuBar from "./Header/MenuBar";
import AddPageBtn from "./reusable_component/AddPageBtn";
import SearchField from "./reusable_component/SearchField";
function Header({ setSidebarToggle, setNewTaskPageToggle }) {
  return (
    <header className=" bg-cyan-950 p-5 py-2 m-0 flex items-center justify-between">
      <div className="flex items-center justify-around">
        <WebIcon />
        <MenuBar setSidebarToggle={setSidebarToggle} />
      </div>
      <div className="flex items-center justify-around gap-4">
        <AddPageBtn setNewTaskPageToggle={setNewTaskPageToggle} />
        <SearchField />
      </div>
    </header>
  );
}

export default Header;
