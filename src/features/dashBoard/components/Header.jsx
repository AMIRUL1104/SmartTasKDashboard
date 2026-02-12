import WebIcon from "./reusable_component/WebIcon";
import MenuBar from "./reusable_component/MenuBar";
import AddPageBtn from "./sideBar/AddPageBtn";
import RemovePage from "./sideBar/RemovePage";
import CloseTaskDetails from "./sideBar/CloseTaskDetails";
import SearchField from "./sideBar/SearchField";
function Header({
  setSidebarToggle,
  setMainSectionToggle,
  mainSectionToggle,
  dispatch,
}) {
  let content;
  if (mainSectionToggle === "newTaskPage") {
    content = <RemovePage setMainSectionToggle={setMainSectionToggle} />;
  } else if (mainSectionToggle === "taskDetails") {
    content = <CloseTaskDetails setMainSectionToggle={setMainSectionToggle} />;
  } else {
    content = <AddPageBtn setMainSectionToggle={setMainSectionToggle} />;
  }
  return (
    <header className=" max-w-[1600px] bg-cyan-950 px-5 py-2 m-0 flex items-center justify-between">
      <div className="flex items-center justify-around">
        <WebIcon />
        <MenuBar setSidebarToggle={setSidebarToggle} />
      </div>
      {/* <h2 className=" text-2xl font-bold">Welcome Amirul</h2> */}
      <div className="flex items-center justify-around gap-4 ">
        {content}

        <SearchField dispatch={dispatch} />
      </div>
    </header>
  );
}

export default Header;
