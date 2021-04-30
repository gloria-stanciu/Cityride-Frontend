import "../css/Sidebar.css";
import { useDispatch } from "react-redux";
// import { Context } from '../store';
import { GetRouteTypes } from "../api/getRouteTypes";
import { useEffect, useState } from "react";
// import { ToggleState } from "../reducer";

export interface DisplayComponent {
  name: string;
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
  const toggle = (isClicked: boolean) => {
    dispatch({ type: "TOGGLE", payload: isClicked });
  };

  const onClickButton = () => {
    toggle(clicked);
    setClicked((prevState) => !prevState);
  };

  useEffect(() => {
    Filters();
  }, []);

  async function Filters() {
    const types = await GetRouteTypes();
    let components: DisplayComponent[] = [];
    const transitTypes = types.map((t) => t.type); // genereaza un array de numere
    const activeButtons = buttons.filter((btn) =>
      transitTypes.includes(btn.type)
    ); // si raman numa alea existente
    const inactiveButtons = buttons.filter(
      (btn) => !transitTypes.includes(btn.type)
    );

    activeButtons.forEach((button) => {
      components.push({
        name: button.name,
        status: "active",
        component: button.active,
        class: "",
      });
    });
    inactiveButtons.forEach((button) => {
      components.push({
        name: button.name,
        status: "inactive",
        component: button.inactive,
        class: "disabled",
      });
    });
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
            filters.map((buttonFilter, index) => (
              <button
                key={index}
                id={buttonFilter.status}
                className={"btn btn-sm btn-responsive ".concat(
                  buttonFilter.class
                )}
                onClick={onClickButton}
              >
                <img
                  id={buttonFilter.status + "-image"}
                  src={buttonFilter.component}
                  alt="arrow"
                  className="image arrow"
                />
                <span className="name"> {buttonFilter.name} </span>
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
