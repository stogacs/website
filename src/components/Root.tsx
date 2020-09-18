import React from "react";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import { ExperiencesComponent, ExperienceProps } from "./Experiences";
import { PicturesComponent } from "./Pictures";

export interface RootProps {
  experiences: ExperienceProps;
  pictures: string[];
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
          <PicturesComponent pictures={this.props.pictures} />
        </Container>
      </Router>
    );
  }
}
