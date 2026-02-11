function SortDropdown({ dispatch }) {
  return (
    <select
      name="sortDropdown"
      onChange={(e) => {
        dispatch({
          type: "SET_SORT",
          payload: e.target.value,
        });
      }}
      className="rounded-lg bg-slate-700  hover:bg-slate-600 px-4 py-2 text-sm text-white outline-none ring-1 ring-slate-600 focus:ring-2 focus:ring-blue-500"
    >
      <option value={"new-old"}>New-Old</option>
      <option value={"old-new"}>Old-New</option>
      <option value={"priority"}>Sort by Priority</option>
      <option value={"status"}>Sort by Status</option>
    </select>
  );
}

export default SortDropdown;
