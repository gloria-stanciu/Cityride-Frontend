import "../css/Sidebar.css";
import { useDispatch } from "react-redux";

function DirectionFilter() {
  const dispatch = useDispatch();

  const setDirection = (type: String) => {
    dispatch({ type: "SET_DIRECTION", payload: type });
  };

  return (
    <div
      className="btn-group btn-group-toggle filter-routes-container"
      data-toggle="buttons"
    >
      <button
        className="btn filter-routes-btns"
        onClick={() => {
          setDirection("outbound");
        }} //outbound = 0
        name="options"
        id="option1"
      >
        Outbound
      </button>
      <button
        className="btn filter-routes-btns"
        onClick={() => setDirection("inbound")} //inbound = 1
        name="options"
        id="option2"
      >
        Inbound
      </button>
    </div>
  );
}

export default DirectionFilter;
