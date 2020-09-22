import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardGroup from "react-bootstrap/CardGroup";
import Card from "react-bootstrap/Card";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName, IconProp, IconPrefix } from "@fortawesome/fontawesome-svg-core";

import TitleDeclaration from "./TitleDeclaration";

import { Presentation, PresentationLink, PresentationsService } from "@data/Presentations";

const StyledNavbar = React.lazy(() => import("./StyledNavbar"));

export interface ResourcesProps {}

interface ResourcesState {
  presentations?: Presentation[];
}

export class ResourcesComponent extends React.Component<ResourcesProps, ResourcesState> {
  presentationService: PresentationsService;

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
          <Container fluid>
            <Row className="text-center mb-5">
              <Col lg={12} className="text-center">
                <h2 className="experiences-heading section-heading text-light text-uppercase">
                  Presentations
                </h2>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <CardGroup>{presentationCards}</CardGroup>
            </Row>
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
        <Card.Footer>Author: {p.author}</Card.Footer>
      </Card>
    );
  }
}

export default ResourcesComponent;
