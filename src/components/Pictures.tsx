import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripHorizontal } from "@fortawesome/free-solid-svg-icons";

import { PicturesService, Pictures } from "@data/Pictures";
import { splitChunks } from "@util";

export interface PicturesProps {}

interface PicturesState {
  data?: Pictures;
  grid: boolean;
}

export class PicturesComponent extends React.Component<PicturesProps, PicturesState> {
  service: PicturesService;

  constructor(props: PicturesProps) {
    super(props);
    this.service = new PicturesService();
    this.state = { grid: false };

    this.service.fetch().then((data) => this.setState({ data: data }));
  }

  toggleGrid(): void {
    this.setState({ grid: !this.state.grid });
  }

  render(): React.ReactNode {
    const headingRow = this.headingRow();
    const picturesRow = this.state.grid ? this.gridPictures() : this.carouselPictures();

    return (
      <section className="pictures-section bg-light-gray">
        <Container>
          {headingRow}
          {picturesRow}
        </Container>
      </section>
    );
  }

  carouselPictures(): React.ReactNode {
    if (!this.state.data) {
      return <Row>Loading...</Row>;
    }

    const pictures = this.state.data;
    const slides = pictures.list.map((data) => (
      <Carousel.Item key={data}>
        <img src={data} className="img-fluid" />
      </Carousel.Item>
    ));

    return (
      <Row className="justify-content-center">
        <Carousel>{slides}</Carousel>
      </Row>
    );
  }

  gridPictures(): React.ReactNode {
    if (!this.state.data) {
      return <Row>Loading...</Row>;
    }

    const pictures = this.state.data;
    const images = pictures.list.map((data) => (
      <Col key={data} md={4} sm={6}>
        <img src={data} className="img-fluid" />
      </Col>
    ));
    const chunks = splitChunks(images, 3).map((row) => (
      <Row key="" className="mb-3">
        {row}
      </Row>
    ));

    return chunks;
  }

  headingRow(): React.ReactNode {
    return (
      <Row className="text-uppercase mb-5">
        <Col lg={12} className="text-center">
          <h2 className="pictures-heading text-dark mb-3">Pictures</h2>
          <Button
            variant={this.state.grid ? "dark" : "outline-dark"}
            size="sm"
            onClick={this.toggleGrid.bind(this)}
          >
            <FontAwesomeIcon icon={faGripHorizontal} color={this.state.grid ? "white" : "black"} />
          </Button>
        </Col>
      </Row>
    );
  }
}

export default PicturesComponent;
