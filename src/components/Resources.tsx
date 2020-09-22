import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName, IconProp, IconPrefix } from "@fortawesome/fontawesome-svg-core";

import TitleDeclaration from "./TitleDeclaration";

import { Presentation, PresentationLink, PresentationsService } from "@data/Presentations";
import { splitChunks } from "@util";

const StyledNavbar = React.lazy(() => import("./StyledNavbar"));

export interface ResourcesProps {}

interface ResourcesState {
  presentations?: Presentation[];
}

export class ResourcesComponent extends React.Component<ResourcesProps, ResourcesState> {
  presentationService: PresentationsService;

  readonly ROW_NUM = 3;

  // eslint-disable-next-line @typescript-eslint/ban-types
  constructor(props: ResourcesProps) {
    super(props);
    this.presentationService = new PresentationsService();
    this.state = {};

    this.presentationService
      .fetch()
      .then((presentations) => this.setState({ presentations: presentations }));
  }

  render(): React.ReactNode {
    const presentationCards = this.state.presentations?.map((p) => this.renderPresentationCard(p));
    const presentationChunks = presentationCards
      ? splitChunks(presentationCards, this.ROW_NUM)
          .map((chunk) => {
            const length = chunk.length;
            for (let i = 0; i < this.ROW_NUM - length; i++) {
              chunk.push(<Card className="invisible"></Card>);
            }
            return chunk;
          })
          .map((chunk) => {
            return (
              <Row key="" className="justify-content-center mb-4 mt-3 ml-2 mr-2">
                <CardDeck className="w-100">{chunk}</CardDeck>
              </Row>
            );
          })
      : undefined;

    return (
      <div>
        <TitleDeclaration parts={["Resources"]} />
        <StyledNavbar>
          <Link to="/" className="nav-section-link">
            Home
          </Link>
        </StyledNavbar>
        <section className="resources-top-padding" />
        <section className="presentations-section">
          <Container>
            <Row className="text-center pb-3 mb-5">
              <Col lg={12} className="text-center">
                <h2 className="experiences-heading section-heading text-light text-uppercase">
                  Presentations
                </h2>
                <h4 className="section-subheading text-muted">Created by Club Members</h4>
              </Col>
            </Row>
            {presentationChunks}
          </Container>
        </section>
      </div>
    );
  }

  renderPresentationCard(p: Presentation): React.ReactNode {
    const linkIcon = (link: PresentationLink) => {
      let icon: IconProp;
      if (typeof link.icon === "string") {
        icon = ["fas", link.icon as IconName];
      } else {
        icon = [link.icon.set as IconPrefix, link.icon.name as IconName];
      }
      return icon;
    };

    const links = p.links.map((link) => (
      <OverlayTrigger
        key={link.url}
        placement="top"
        overlay={<Tooltip id={p.slug + link.url}>{link.tooltip}</Tooltip>}
      >
        <a target="_blank" rel="noopener noreferrer" href={link.url} className="text-light mr-2">
          <FontAwesomeIcon icon={linkIcon(link)} />
        </a>
      </OverlayTrigger>
    ));

    const authorText = typeof p.author === "string" ? p.author : p.author.join(", ");

    return (
      <Card>
        <Card.Header>
          <span className="resources-presentation-header-name mr-3">{p.slug}</span>
          {links}
        </Card.Header>
        <Card.Body>
          <Card.Title>{p.title}</Card.Title>
          <Card.Text>{p.description}</Card.Text>
        </Card.Body>
        <Card.Footer>
          {authorText} <small className="text-muted ml-1">{p.year}</small>
        </Card.Footer>
      </Card>
    );
  }
}

export default ResourcesComponent;
