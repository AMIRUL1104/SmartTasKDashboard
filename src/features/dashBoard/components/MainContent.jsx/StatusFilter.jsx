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
      className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-600"
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
