import "../css/Sidebar.css";
function Sidebar() {
  function ToggleSidebar(id) {
    let elem = document.getElementById(id);
    if (!elem) return;
    let classes = elem.className.split(" ");
    let collapsed = classes.indexOf("collapsed") !== -1;

    if (collapsed) {
      classes.splice(classes.indexOf("collapsed"), 1);
    } else {
      classes.push("collapsed");
    }

    // Update the class list on the element
    if (!elem) return;
    elem.className = classes.join(" ");
  }
  if (window.innerWidth <= 600) {
    return (
      <div id="bottom" className="sidebar flex-center bottom collapsed">
        <div className="sidebar-content rounded-rect flex-center">
          Bottom Sidebar
          <div
            className="sidebar-toggle rounded-rect bottom"
            onClick={() => ToggleSidebar("bottom")}
          >
            &uarr;
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div id="right" className="sidebar flex-center right collapsed">
        <div className="sidebar-content rounded-rect flex-center">
          Right Sidebar
          <div
            className="sidebar-toggle rounded-rect right"
            onClick={() => ToggleSidebar("right")}
          >
            &larr;
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
