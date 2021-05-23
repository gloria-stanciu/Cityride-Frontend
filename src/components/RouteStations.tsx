import "../css/RouteStations.css";
import { useDispatch, useSelector } from "react-redux";
import { routeDetailsState } from "../store/routeDetails";
import { getTimetable } from "../api/routeTimetable";
import { Direction } from "../store/direction";
import { useEffect, useState } from "react";
import { Station } from "../api/interfaces";
import { LeftArrow } from "./LeftArrow";
import { formatDistanceToNow, formatDistanceToNowStrict } from "date-fns";

function RouteStations() {
  const [timetable, setTimetable] = useState<Station[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  const dispatch = useDispatch();

  const routeDetails = useSelector<any, routeDetailsState>(
    (state) => state.routeDetails
  );
  const setRouteDetails = (type: routeDetailsState) => {
    dispatch({ type: "SHOW_ROUTE_DETAILS", payload: type });
  };

  const setCurrentStation = (type: object) => {
    dispatch({ type: "FLY_TO", payload: type });
  };

  const direction = useSelector<any, Direction>(
    (state) => state.changeDirection.direction
  );

  async function fetchTimetable() {
    const routeDirection = direction === "outbound" ? 0 : 1;
    const response = await getTimetable(routeDetails.routeId, routeDirection);
    setTimetable(response);
  }

  function parseArrivalTime(arrivalTime: string) {
    const splittedArrivalTime = arrivalTime.split(":");
    const date = new Date();
    date.setHours(
      parseInt(splittedArrivalTime[0]),
      parseInt(splittedArrivalTime[1]),
      parseInt(splittedArrivalTime[2])
    );
    return date;
  }

  useEffect(() => {
    routeDetails.routeName !== "" && fetchTimetable();
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60 * 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  function Station(props: { station: Station }) {
    return (
      <div
        className="station-container btn"
        onClick={() =>
          setCurrentStation({
            lat: props.station.lat,
            long: props.station.long,
          })
        }
      >
        <div className="station-name">{props.station.name}</div>
        <div className="time-container">
          <div className="time">
            Arrives in <br />
            {formatDistanceToNowStrict(
              parseArrivalTime(props.station.arrivalTime)
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="header-box">
        <div className="info-box">
          <div className="back-button">
            <button
              className="btn p-0"
              onClick={() => {
                setRouteDetails({
                  routeId: "",
                  routeName: "",
                  from: "",
                  to: "",
                  direction: {
                    shapeId: "",
                    stops: [],
                  },
                });
              }}
            >
              <LeftArrow />
            </button>
          </div>
          <div className="route-box-name">
            <span className="route-card-name">{routeDetails.routeName}</span>
          </div>
        </div>
        <div className="start-stop-stations-box">
          <span className="start-station">
            <strong>{routeDetails.from}</strong>
          </span>
          <span className="rotate-arrow">
            <LeftArrow />
          </span>
          <span className="stop-station">
            <strong>{routeDetails.to}</strong>
          </span>
        </div>
        <div className="current-time">
          Current time: &nbsp;
          <strong>
            {currentTime.toLocaleTimeString([], {
              hour: "numeric",
              minute: "numeric",
            })}
          </strong>
        </div>
      </div>
      {timetable ? (
        timetable.map((station, index) => (
          <Station key={index} station={station} />
        ))
      ) : (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      )}
    </>
  );
}

export default RouteStations;
