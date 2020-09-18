import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Pictures } from "@data/models/Pictures";
import { splitChunks } from "@util";

export type PicturesProps = Pictures;

export class PicturesComponent extends React.Component<PicturesProps> {
  render(): React.ReactNode {
    const images = this.props.pictures.map((data) => (
      <Col key={data} sm={2} md={4} lg={4} xl={4} className="mb-3">
        <img src={data} className="img-fluid" />
      </Col>
    ));
    const chunks = splitChunks(images, 3).map((row) => <Row key="">{row}</Row>);
    return <Container>{chunks}</Container>;
  }
}
