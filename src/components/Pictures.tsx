import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { PicturesService, Pictures } from "@data/Pictures";
import { splitChunks } from "@util";

export interface PicturesProps {}

interface PicturesState {
  data?: Pictures;
}

export class PicturesComponent extends React.Component<PicturesProps, PicturesState> {
  service: PicturesService;

  constructor(props: PicturesProps) {
    super(props);
    this.service = new PicturesService();
    this.state = {};

    this.service.fetch().then((data) => this.setState({ data: data }));
  }

  render(): React.ReactNode {
    if (!this.state.data) {
      return <Container>Loading...</Container>;
    }

    const pictures = this.state.data;
    const images = pictures.list.map((data) => (
      <Col key={data} sm={2} md={4} lg={4} xl={4} className="mb-3">
        <img src={data} className="img-fluid" />
      </Col>
    ));
    const chunks = splitChunks(images, 3).map((row) => <Row key="">{row}</Row>);
    return <Container>{chunks}</Container>;
  }
}
