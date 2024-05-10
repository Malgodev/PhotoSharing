import React from "react";
import { AppBar, Toolbar } from "@mui/material";

import "./styles.css";

function TopBar({ context, setFeature }) {
  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar style={{ justifyContent: "space-between" }}>
        <div className="setting">
          <h2>Photo Sharing App</h2>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
