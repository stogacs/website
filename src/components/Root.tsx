import React from "react";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import { ExperiencesComponent, ExperiencesProps } from "./Experiences";
import { PicturesComponent, PicturesProps } from "./Pictures";
import { ContactsComponent, ContactsProps } from "./Contacts";

export interface RootProps {
  experiences: ExperiencesProps;
  pictures: PicturesProps;
  contacts: ContactsProps;
}

export class RootComponent extends React.Component<RootProps> {
  render(): React.ReactNode {
    return (
      <Router>
        <Container>
          <Nav variant="pills">
            <Nav.Item>
              <HashLink to="#experiences">Experiences</HashLink>
            </Nav.Item>
          </Nav>

          <ExperiencesComponent competitions={this.props.experiences.competitions} />
          <PicturesComponent pictures={this.props.pictures.pictures} />
          <ContactsComponent
            links={this.props.contacts.links}
            people={this.props.contacts.people}
          />
        </Container>
      </Router>
    );
  }
}
