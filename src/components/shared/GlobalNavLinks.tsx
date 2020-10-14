import React from "react";
import { Link } from "react-router-dom";

export class GlobalNavLinks extends React.Component {
  render(): React.ReactNode {
    return (
      <div>
        <Link to="/resources" className="nav-section-link">
          Resources
        </Link>
        <Link to="/tools" className="nav-section-link">
          Tools
        </Link>
        <a href="/codefest" className="disabled nav-section-link">
          CodeFest
        </a>
      </div>
    );
  }
}

export default GlobalNavLinks;
