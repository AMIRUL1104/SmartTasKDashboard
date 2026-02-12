function SearchField({ dispatch }) {
  return (
    <input
      type="text"
      name="taskSearch"
      // value={handleFiltering}
      onChange={(e) => {
        dispatch({
          type: "SET_SEARCH",
          payload: e.target.value,
        });
      }}
      placeholder="Search..."
      className="  hover:shadow hover:shadow-amber-50  font-semibold px-2.5 bg-gray-300 p-1.5  rounded-2xl text-neutral-800 text-sm "
    />
  );
}

export default SearchField;
