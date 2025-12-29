function SaveTaskButton({ setNewTaskPageToggle }) {
  return (
    <button
      type="submit"
      onClick={() => setNewTaskPageToggle((previus) => !previus)}
      className=" hover:shadow hover:shadow-amber-50 hover:text-cyan-700 bg-gray-300 p-1.5 rounded-2xl  flex justify-between w-auto px-2.5 items-center capitalize font-bold text-cyan-900"
    >
      remove Page
    </button>
  );
}

export default SaveTaskButton;
