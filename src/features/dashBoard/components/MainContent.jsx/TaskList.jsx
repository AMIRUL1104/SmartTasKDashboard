function TaskList({ allTask }) {
  return (
    <div>
      <ul className=" mt-4 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        {allTask.map((task) => (
          <li
            key={task.id}
            className=" bg-cyan-900 h-45 overflow-clip p-2.5 shadow-md shadow-cyan-950 rounded-lg "
          >
            <h3 className=" text-2xl font-medium">{task.title}</h3>
            <p className="my-2">
              {(() => {
                const text = task.textarea[1] || "";
                const words = text.split(" ");

                return words.length > 30
                  ? words.slice(0, 30).join(" ") + "  . . ."
                  : text;
              })()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
