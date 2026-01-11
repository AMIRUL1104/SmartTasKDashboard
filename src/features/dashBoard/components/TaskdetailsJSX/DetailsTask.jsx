function DetailsTask({ tasks }) {
  // console.log(tasks);

  return (
    <div>
      {tasks.map((e) => {
        console.log(e.value);

        return (
          <p
            key={e.id}
            className="  focus:bg-sky-100 w-full 
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
