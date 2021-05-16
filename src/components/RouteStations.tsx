import "../css/Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { routeDetailsState } from "../store/routeDetails";

function RouteStations() {
  const dispatch = useDispatch();

  const routeDetails = useSelector<any, routeDetailsState>(
    (state) => state.routeDetails
  );
  const setRouteDetails = (type: routeDetailsState) => {
    dispatch({ type: "SHOW_ROUTE_DETAILS", payload: type });
  };

  return (
    <div className="filter-buttons">
      <button
        className="btn"
        onClick={() => {
          setRouteDetails({
            isVisible: false,
            routeId: routeDetails.routeId,
            direction: routeDetails.direction,
          });
        }}
      >
        Back
      </button>
    </div>
  );
}

export default RouteStations;
