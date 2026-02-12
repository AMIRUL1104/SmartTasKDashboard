function DetailsTask({ tasks }) {
  // console.log(tasks);

  return (
    <div className=" mt-4  p-4 bg-gray-100 rounded-lg">
      {tasks.map((e) => {
        return (
          <p
            key={e.id}
            className="  w-full min-h-7 font-normal 
              text-base leading-relaxed py-[3px] px-0.5 rounded-lg"
          >
            {e.value}
          </p>
        );
      })}
    </div>
  );
}

export default DetailsTask;
