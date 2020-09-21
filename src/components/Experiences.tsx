import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { ExperiencesService, Experiences } from "@data/Experiences";

export interface ExperiencesProps {}

interface ExperiencesState {
  experiences?: Experiences;
}

export class ExperiencesComponent extends React.Component<ExperiencesState, ExperiencesState> {
  service: ExperiencesService;

  constructor(props: ExperiencesState) {
    super(props);
    this.service = new ExperiencesService();
    this.state = {};

    this.service.fetch().then((data) => this.setState({ experiences: data }));
  }

  render(): React.ReactNode {
    if (!this.state.experiences) {
      return <div>Loading...</div>;
    }

    const competitions = this.state.experiences.competitions;
    const competitionElems = competitions.map((competition) => {
      const listings = competition.awards.map((award) => (
        <p key={award.title} className="text-muted m-0">
          <b>
            {award.year} {award.title}
          </b>{" "}
          {award.names.length != 0 && "- " + award.names.join(", ")}
        </p>
      ));

      return (
        <Col key={competition.title} md={3} className="m-2">
          <h4 className="m-2">
            <a className="text-primary" href={competition.link.toString()}>
              {competition.title}
            </a>
          </h4>
          {listings}
        </Col>
      );
    });

    // const competitionChunks = splitChunks(competitionElems, 3).map((chunk) => {
    // return <Col key="">{chunk}</Col>;
    // });

    return (
      <section className="experiences-section bg-light">
        <Container fluid>
          <Row className="mb-5">
            <Col lg={12} className="text-center">
              <h2 className="experiences-heading section-heading text-dark text-uppercase">
                Experience
              </h2>
              <h3 className="experiences-subheading section-subheading text-muted">Awards</h3>
            </Col>
          </Row>
          <Row className="text-center justify-content-center">{competitionElems}</Row>
        </Container>
      </section>
    );
  }
}

export default ExperiencesComponent;
