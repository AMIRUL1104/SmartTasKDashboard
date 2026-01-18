function SearchField({ handleFiltering }) {
  return (
    <input
      type="text"
      name="taskSearch"
      // value={handleFiltering}
      onChange={handleFiltering}
      placeholder="Search..."
      className="  hover:shadow hover:shadow-amber-50  font-semibold px-2.5 bg-gray-300 p-1.5 max-sm:p-1 max-sm:font-medium max-xs:py-0.5 max-xs:max-w-20 rounded-2xl text-neutral-800 text-sm "
    />
  );
}

export default SearchField;
