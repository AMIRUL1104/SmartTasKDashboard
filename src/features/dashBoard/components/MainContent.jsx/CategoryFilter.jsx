function CategoryFilter({ handleFiltering }) {
  return (
    <select
      onClick={handleFiltering}
      name="category"
      className="rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-slate-600"
    >
      <option value="all" className=" mt-2.5">
        All Categories
      </option>
      <option value="work">Work</option>
      <option value="personal">Personal</option>
      <option value="shopping">Shopping</option>
      <option value="others">Others</option>
    </select>
  );
}
// react component er mode select tag er ooption value er value  value={"high"} eri vabe lekhbo naki value="work" eivabe
export default CategoryFilter;
