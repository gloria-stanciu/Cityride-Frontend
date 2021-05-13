import "../css/Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { GetRouteTypes } from "../api/getRouteTypes";
import { useEffect, useState } from "react";
import { ToggleState, TransportType } from "../store/filters";

export interface DisplayComponent {
  name: string;
  type: TransportType;
  status: string;
  component: string;
  class: string;
}

interface Direction {
  shapeId: string;
  stops: {
    id: string;
    name: string;
    sequence: number;
    routeId: string;
    lat: string;
    long: string;
  }[];
}

export interface Routes {
  id: string;
  longName: string;
  shortName: string;
  outbound: Direction;
  inbound: Direction;
  type: number;
}

const buttons = [
  {
    name: "Tram",
    type: 0, //from GTFS
    active: "/images/Tram/tram-active.svg",
    inactive: "/images/Tram/tram-active.svg",
  },
  {
    name: "Bus",
    type: 3, //from GTFS
    active: "/images/Bus/bus-active.svg",
    inactive: "/images/Bus/bus-active.svg",
  },
  {
    name: "Train",
    type: 2, //from GTFS
    active: "/images/Train/train-active.svg",
    inactive: "/images/Train/train-active.svg",
  },
  {
    name: "Subway",
    type: 1, //from GTFS
    active: "/images/Subway/subway-active.svg",
    inactive: "/images/Subway/subway-active.svg",
  },
];

function FilterButtons() {
  const [filters, setFilters] = useState<DisplayComponent[]>();
  const dispatch = useDispatch();

  const setType = (type: TransportType) => {
    dispatch({ type: "SET_TYPE", payload: type });
  };

  const selectedType = useSelector<any, ToggleState["transportType"]>(
    (state) => state.toggleReducer.transportType
  );

  useEffect(() => {
    Filters();
  }, []);

  async function Filters() {
    const types = await GetRouteTypes();
    const transitTypes = types.map((t) => t.type); // genereaza un array de numere

    const components: DisplayComponent[] = buttons.map((btn) => ({
      name: btn.name,
      type: btn.type,
      ...(transitTypes.includes(btn.type)
        ? {
            class: "active",
            component: btn.active,
            status: "active",
          }
        : {
            class: "disabled",
            component: btn.inactive,
            status: "inactive",
          }),
    }));

    if (!filters) setFilters([...components]);
  }

  return (
    <div className="filter-buttons">
      {filters ? (
        filters.map((btn, index) => (
          <button
            key={index}
            id={btn.status}
            className={[
              "btn btn-sm btn-responsive filter-btns",
              btn.class,
              btn.type === selectedType ? "filter-selected" : "",
            ].join(" ")}
            onClick={() => {
              setType(btn.type);
              console.log(selectedType);
            }}
          >
            <img
              id={btn.status + "-image"}
              src={btn.component}
              alt="arrow"
              className="filter-image arrow"
            />
            <span className="name"> {btn.name} </span>
          </button>
        ))
      ) : (
        <p>Please wait</p>
      )}
    </div>
  );
}

export default FilterButtons;
