import DetailsTask from "./TaskdetailsJSX/DetailsTask";

function TaskDetails({ currentTaskDetails }) {
  // console.log(currentTaskDetails);
  const tasks = currentTaskDetails.textarea;
  return (
    <div className=" bg-white  rounded-2xl  mx-8 my-5 text-base text-gray-950 p-10  min-h-dvh ">
      <div className=" flex items-center justify-between border-b-2 pb-1 mb-2.5">
        <div></div>
        <button className=" border-2 px-1.5 rounded-sm font-semibold">
          Edit
        </button>
      </div>
      <div>
        <h4 className=" text-4xl font-bold  text-gray-800 ">
          {currentTaskDetails.title}
        </h4>
        <DetailsTask tasks={tasks} />
      </div>
    </div>
  );
}

export default TaskDetails;
