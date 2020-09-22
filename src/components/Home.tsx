import React, { Suspense } from "react";
import Container from "react-bootstrap/Container";
import { HashLink } from "react-router-hash-link";
import Scrollspy from "react-scrollspy";

import TitleDeclaration from "./TitleDeclaration";

const StyledNavbar = React.lazy(() => import("./StyledNavbar"));
const ExperiencesComponent = React.lazy(() => import("./Experiences"));
const PicturesComponent = React.lazy(() => import("./Pictures"));
const ContactsComponent = React.lazy(() => import("./Contacts"));

export class HomeComponent extends React.Component {
  render(): React.ReactNode {
    return (
      <div>
        <TitleDeclaration />
        <HomeNavbar />
        <Suspense fallback={<div>Loading...</div>}>
          <section id="home" className="header-section">
            <Container className="header-container"></Container>
          </section>

          <section id="experiences">
            <ExperiencesComponent />
          </section>

          <section id="pictures">
            <PicturesComponent />
          </section>

          <section id="contacts">
            <ContactsComponent />
          </section>
        </Suspense>
      </div>
    );
  }
}

class HomeNavbar extends React.Component {
  render(): React.ReactNode {
    return (
      <StyledNavbar>
        <Scrollspy
          currentClassName="nav-link-scrolled"
          items={["home", "experiences", "pictures", "contacts"]}
          componentTag="span"
          offset={-2}
        >
          <HashLink smooth to="#experiences" className="nav-section-link">
            Experience
          </HashLink>
          <HashLink smooth to="#pictures" className="nav-section-link">
            Pictures
          </HashLink>
          <HashLink smooth to="#contacts" className="nav-section-link">
            Contacts
          </HashLink>
        </Scrollspy>
      </StyledNavbar>
    );
  }
}

export default HomeComponent;
