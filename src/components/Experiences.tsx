import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Experiences } from "@data/models/Experiences";
import { splitChunks } from "@util";

export type ExperiencesProps = Experiences;

export class ExperiencesComponent extends React.Component<ExperiencesProps> {
  render(): React.ReactNode {
    const competitionElems = this.props.competitions.map((competition) => {
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
