function CategoryFilter({ dispatch }) {
  return (
    <select
      name="category"
      onChange={(e) => {
        dispatch({
          type: "SET_CATEGORY",
          payload: e.target.value,
        });
      }}
      className="rounded-lg bg-slate-800 px-2 py-1 text-sm text-white outline-none ring-1 ring-slate-600 "
    >
      <option value="all">All Categories</option>
      <option value="work">Work</option>
      <option value="personal">Personal</option>
      <option value="shopping">Shopping</option>
      <option value="others">Others</option>
    </select>
  );
}
// react component er mode select tag er ooption value er value  value={"high"} eri vabe lekhbo naki value="work" eivabe
export default CategoryFilter;
