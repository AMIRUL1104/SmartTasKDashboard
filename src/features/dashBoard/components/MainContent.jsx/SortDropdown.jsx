function SortDropdown() {
  return (
    <select className="rounded-lg bg-slate-700  hover:bg-slate-600 px-4 py-2 text-sm text-white outline-none ring-1 ring-slate-600 focus:ring-2 focus:ring-blue-500">
      <option>Sort by Date</option>
      <option>Sort by Priority</option>
      <option>Sort by Status</option>
    </select>
  );
}

export default SortDropdown;
