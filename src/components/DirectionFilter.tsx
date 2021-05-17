import "../css/Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { Direction } from "../store/direction";
import { ToggleState } from "../store/filters";

function DirectionFilter() {
  const dispatch = useDispatch();

  const direction = useSelector<any, Direction>(
    (state) => state.changeDirection.direction
  );

  const setDirection = (direction: Direction) => {
    dispatch({ type: "SET_DIRECTION", payload: direction });
  };

  const selectedType = useSelector<any, ToggleState["transportType"]>(
    (state) => state.toggleReducer.transportType
  );

  return (
    <div>
      {selectedType != -1 ? (
        <div
          className="btn-group btn-group-toggle filter-routes-container"
          data-toggle="buttons"
        >
          <button
            className={[
              "btn filter-routes-btns",
              direction === Direction.outbound ? "default-active-button" : "",
            ].join(" ")}
            onClick={() => setDirection(Direction.outbound)}
            name="options"
            id="option1"
          >
            Outbound
          </button>
          <button
            className={[
              "btn filter-routes-btns",
              direction === Direction.inbound ? "default-active-button" : "",
            ].join(" ")}
            onClick={() => setDirection(Direction.inbound)}
            name="options"
            id="option2"
          >
            Inbound
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default DirectionFilter;
