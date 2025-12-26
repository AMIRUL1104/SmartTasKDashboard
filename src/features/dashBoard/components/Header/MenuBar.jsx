import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
function MenuBar({ setSidebarToggle }) {
  return (
    <button onClick={() => setSidebarToggle((prev) => !prev)}>
      <FontAwesomeIcon
        icon={faBarsStaggered}
        size="2x"
        className=" text-cyan-700 ml-6"
      />
    </button>
  );
}

export default MenuBar;
