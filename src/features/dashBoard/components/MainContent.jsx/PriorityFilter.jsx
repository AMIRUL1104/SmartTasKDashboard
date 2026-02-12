function PriorityFilter({ dispatch }) {
  return (
    <select
      name="priority"
      onChange={(e) => {
        dispatch({
          type: "SET_PRIORITY",
          payload: e.target.value,
        });
      }}
      className="rounded-lg bg-slate-800 px-2 py-1 text-sm text-white outline-none ring-1 ring-slate-600 "
    >
      <option value="all">Priority</option>
      <option value="high">High</option>
      <option value="medium">Medium</option>
      <option value="low">Low</option>
    </select>
  );
}

export default PriorityFilter;
