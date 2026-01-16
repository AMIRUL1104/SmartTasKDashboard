function PriorityFilter({ handleFiltering }) {
  return (
    <select
      name="priority"
      onClick={handleFiltering}
      className="rounded-lg bg-slate-800 px-4 py-2 text-sm text-white outline-none ring-1 ring-slate-600 "
    >
      <option value="all">Priority</option>
      <option value="high">High</option>
      <option value="medium">Medium</option>
      <option value="low">Low</option>
    </select>
  );
}

export default PriorityFilter;
