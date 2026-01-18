import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
function MenuBar({ setSidebarToggle }) {
  return (
    <button onClick={() => setSidebarToggle((prev) => !prev)}>
      <FontAwesomeIcon
        icon={faBarsStaggered}
        className=" text-cyan-700 ml-6 max-sm:ml-3 max-xs:ml-2 text-4xl max-sm:text-2xl max-xs:text-lg"
      />
    </button>
  );
}

export default MenuBar;
