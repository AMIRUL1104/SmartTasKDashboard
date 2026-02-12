function StatusFilter({ dispatch }) {
  return (
    <select
      name="status"
      onChange={(e) => {
        dispatch({
          type: "SET_STATUS",
          payload: e.target.value,
        });
      }}
      className="rounded-lg bg-slate-800 px-2 py-1 text-sm text-white outline-none ring-1 ring-slate-600 "
    >
      <option value="all" className=" mt-2.5">
        Status
      </option>
      <option value="completed">Completed</option>
      <option value="pending">Pending</option>
      <option value="in-progress">In Progress</option>
    </select>
  );
}

export default StatusFilter;
