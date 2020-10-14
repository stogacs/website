import React, { Suspense } from "react";
import { Link } from "react-router-dom";

import TitleDeclaration from "./shared/TitleDeclaration";

const MSTQueryComponent = React.lazy(() => import("./MSTQuery"));
const StyledNavbar = React.lazy(() => import("./shared/StyledNavbar"));

class ToolsComponent extends React.Component {
  render(): React.ReactNode {
    return (
      <div>
        <TitleDeclaration parts={["Tools"]} />
        <StyledNavbar>
          <Link to="/" className="nav-section-link">
            Home
          </Link>
          <Link to="/resources" className="nav-section-link">
            Resources
          </Link>
        </StyledNavbar>
        <section className="tools-top-padding" />
        <Suspense fallback={<div>Loading...</div>}>
          <MSTQueryComponent />
        </Suspense>
      </div>
    );
  }
}

export default ToolsComponent;
