import React, { Suspense } from "react";
import { Link } from "react-router-dom";

import TitleDeclaration from "./TitleDeclaration";

const PresentationsComponent = React.lazy(() => import("./Presentations"));
const StyledNavbar = React.lazy(() => import("./StyledNavbar"));

export class ResourcesComponent extends React.Component {
  render(): React.ReactNode {
    return (
      <div>
        <TitleDeclaration parts={["Presentations"]} />
        <StyledNavbar>
          <Link to="/" className="nav-section-link">
            Home
          </Link>
        </StyledNavbar>
        <section className="resources-top-padding" />
        <Suspense fallback={<div>Loading...</div>}>
          <PresentationsComponent />
        </Suspense>
      </div>
    );
  }
}

export default ResourcesComponent;
