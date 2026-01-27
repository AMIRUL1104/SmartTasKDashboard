import WebIcon from "./Header/WebIcon";
import MenuBar from "./Header/MenuBar";
import AddPageBtn from "./reusable_component/AddPageBtn";
import SearchField from "./reusable_component/SearchField";
import RemovePage from "./reusable_component/RemovePage";
import CloseTaskDetails from "./Header/CloseTaskDetails";
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
    <header className=" max-w-[1600px] bg-cyan-950 p-5 py-2 m-0 flex items-center justify-between">
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
