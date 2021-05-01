import "../css/Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
// import { Context } from '../store';
import { GetRouteTypes } from "../api/getRouteTypes";
import { useEffect, useState } from "react";
import { ToggleState, TransportType } from "../store/filters";
// import { ToggleState } from "../reducer";

export interface DisplayComponent {
  name: string;
  type: TransportType;
  status: string;
  component: string;
  class: string;
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

function Sidebar() {
  const [filters, setFilters] = useState<DisplayComponent[]>();

  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();
  const setType = (type: TransportType) => {
    dispatch({ type: "SET_TYPE", payload: type });
  };

  const selectedType = useSelector<ToggleState, ToggleState["transportType"]>(
    (state) => state.transportType
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

  const [isCollapsed, setIsCollapsed] = useState(false);

  function ToggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className="sidebar-overlay">
      <aside className={`sidebar ${isCollapsed ? "sidebar-collapsed" : ""}`}>
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
                onClick={() => setType(btn.type)}
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

        <div className="sidebar-toggle-wrapper">
          <button className="sidebar-toggle" onClick={() => ToggleSidebar()}>
            <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"
              />
            </svg>
          </button>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;
function Context(Context: any): { dispatch: any } {
  throw new Error("Function not implemented.");
}
