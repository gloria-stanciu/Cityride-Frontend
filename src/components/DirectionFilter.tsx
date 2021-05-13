import "../css/Sidebar.css";
import { useDispatch } from "react-redux";
import { Direction } from "../store/direction";

function DirectionFilter() {
  const dispatch = useDispatch();

  const setDirection = (type: Direction) => {
    dispatch({ type: "SET_DIRECTION", payload: type });
  };

  return (
    <div
      className="btn-group btn-group-toggle filter-routes-container"
      data-toggle="buttons"
    >
      <button
        className="btn filter-routes-btns"
        onClick={() => setDirection(Direction.outbound)} //outbound = 0
        name="options"
        id="option1"
      >
        Outbound
      </button>
      <button
        className="btn filter-routes-btns"
        onClick={() => setDirection(Direction.inbound)} //inbound = 1
        name="options"
        id="option2"
      >
        Inbound
      </button>
    </div>
  );
}

export default DirectionFilter;
