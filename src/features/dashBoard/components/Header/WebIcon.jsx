import ReactIcon from "../../../../assets/reactIcon.png";

function WebIcon() {
  return (
    <div>
      <img
        src={ReactIcon}
        alt="webicon"
        srcSet={ReactIcon}
        className="w-6 bg-transparent rounded-full max-xs:w-5 "
      />
    </div>
  );
}

export default WebIcon;
