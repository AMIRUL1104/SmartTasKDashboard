function DetailsTask({ tasks }) {
  // console.log(tasks);

  return (
    <div>
      {tasks.map((e) => {
        return (
          <p
            key={e.id}
            className="  w-full 
          text-xl
          font-normal  my-4"
          >
            {e.value}
          </p>
        );
      })}
    </div>
  );
}

export default DetailsTask;
