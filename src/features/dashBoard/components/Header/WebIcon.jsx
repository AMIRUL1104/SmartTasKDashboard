import webIcon from "../../../../assets/notio-high-resolution-logo-grayscale.png";
function WebIcon() {
  return (
    <div className="w-8 p-1 rounded-full bg-white overflow-hidden flex items-center justify-center ">
      <img
        src={webIcon}
        alt="webicon"
        srcSet={webIcon}
        className="w-12/12  object-cover object-center"
      />
    </div>
  );
}

export default WebIcon;
