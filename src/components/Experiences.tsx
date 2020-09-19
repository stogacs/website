import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { ExperiencesService, Experiences } from "@data/Experiences";
import { splitChunks } from "@util";

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
        <p key={award.title}>
          <b>{award.title}</b> {award.names.length != 0 && "- " + award.names.join(", ")}
        </p>
      ));

      return (
        <Row key={competition.title}>
          <Row>
            <b>
              <a href={competition.link.toString()}>{competition.title}</a>
            </b>
          </Row>
          <br />
          <Row>{listings}</Row>
        </Row>
      );
    });

    const competitionChunks = splitChunks(competitionElems, 3).map((chunk) => {
      return <Col key="">{chunk}</Col>;
    });

    return <div>{competitionChunks}</div>;
  }
}
