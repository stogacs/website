import React from "react";

export class GlobalNavLinks extends React.Component {
  render(): React.ReactNode {
    return (
      <div>
        <a href="/codefest" className="disabled nav-section-link">
          CodeFest
        </a>
      </div>
    );
  }
}

export default GlobalNavLinks;
