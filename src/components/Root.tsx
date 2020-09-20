import React from "react";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import { ExperiencesComponent } from "./Experiences";
import { PicturesComponent } from "./Pictures";
import { ContactsComponent } from "./Contacts";

export class RootComponent extends React.Component {
  render(): React.ReactNode {
    return (
      <Router>
        <Container>
          <Nav variant="pills">
            <Nav.Item>
              <HashLink to="#experiences">Experiences</HashLink>
            </Nav.Item>
          </Nav>
        </Container>

        <ExperiencesComponent />
        <PicturesComponent />
        <section>
          <ContactsComponent />
        </section>
      </Router>
    );
  }
}
