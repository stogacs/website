import React from "react";
import { Link } from "react-router-dom";

const StyledNavbar = React.lazy(() => import("./StyledNavbar"));

export class ResourcesComponent extends React.Component {
  render(): React.ReactNode {
    return (
      <div>
        <StyledNavbar>
          <Link to="/" className="nav-section-link">
            Home
          </Link>
        </StyledNavbar>
      </div>
    );
  }
}

export default ResourcesComponent;
