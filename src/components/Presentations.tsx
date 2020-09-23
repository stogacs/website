import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName, IconProp, IconPrefix } from "@fortawesome/fontawesome-svg-core";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";

import { Presentation, PresentationLink, PresentationsService } from "@data/Presentations";
import { splitChunks } from "@util";

export interface PresentationsProps {}

interface PresentationsState {
  presentations?: Presentation[];
  searchQuery: string;
  sortOrder: SortOrder;
}

interface SortOrder {
  mode: SortMode;
  reverse: boolean;
}

enum SortMode {
  Author = "Author",
  Slug = "Slug",
  Title = "Title",
  Year = "Year",
}

export class PresentationsComponent extends React.Component<
  PresentationsProps,
  PresentationsState
> {
  presentationService: PresentationsService;

  readonly ROW_NUM = 3;

  // eslint-disable-next-line @typescript-eslint/ban-types
  constructor(props: PresentationsProps) {
    super(props);
    this.presentationService = new PresentationsService();
    this.state = {
      searchQuery: "",
      sortOrder: {
        mode: SortMode.Year,
        reverse: true,
      },
    };

    this.presentationService.fetch().then((presentations) => {
      presentations = this.sortPresentations(presentations, this.state.sortOrder);
      this.setState({ presentations: presentations });
    });
  }

  private setSortMode(mode: SortMode): void {
    this.setSortOrder({ mode: mode, reverse: !this.state.sortOrder.reverse });
  }

  private toggleSortReverse(): void {
    this.setSortOrder({ mode: this.state.sortOrder.mode, reverse: !this.state.sortOrder.reverse });
  }

  private setSortOrder(order: SortOrder): void {
    const presentations = this.state.presentations
      ? this.sortPresentations(this.state.presentations, order)
      : undefined;
    this.setState({
      sortOrder: order,
      presentations: presentations,
    });
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
      <section className="presentations-section">
        <Container>
          <Row className="text-center pb-1 mb-5">
            <Col lg={12} className="text-center">
              <h2 className="experiences-heading section-heading text-light text-uppercase">
                Presentations
              </h2>
              <h4 className="section-subheading text-muted">Created by Club Members</h4>
            </Col>
          </Row>
          <Row className="mb-5">
            <Col className="justify-content-center text-center">
              <DropdownButton
                as={ButtonGroup}
                title={this.state.sortOrder.mode}
                variant="dark"
                className="mr-1"
              >
                {[SortMode.Author, SortMode.Slug, SortMode.Title, SortMode.Year].map((variant) => (
                  <Dropdown.Item key={variant} onSelect={() => this.setSortMode(variant)}>
                    {variant}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
              <Button variant="dark" onClick={() => this.toggleSortReverse()}>
                <FontAwesomeIcon icon={this.state.sortOrder.reverse ? faAngleUp : faAngleDown} />
              </Button>
            </Col>
          </Row>
          {presentationChunks}
        </Container>
      </section>
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

  private sortPresentations(presentations: Presentation[], sortOrder: SortOrder): Presentation[] {
    let sortProperty: (a: Presentation, b: Presentation) => [string | number, string | number];
    switch (sortOrder.mode) {
      case SortMode.Author:
        sortProperty = (a: Presentation, b: Presentation) => {
          let astr;
          if (typeof a.author == "string") {
            astr = a.author as string;
          } else {
            astr = a.author.join("");
          }

          let bstr;
          if (typeof b.author == "string") {
            bstr = b.author as string;
          } else {
            bstr = b.author.join("");
          }

          return [astr, bstr];
        };
        break;
      case SortMode.Slug:
        sortProperty = (a: Presentation, b: Presentation) => [a.slug, b.slug];
        break;
      case SortMode.Title:
        sortProperty = (a: Presentation, b: Presentation) => [a.title, b.title];
        break;
      case SortMode.Year:
        sortProperty = (a: Presentation, b: Presentation) => [a.year, b.year];
        break;
    }

    presentations = presentations?.sort((a, b) => {
      const [ca, cb] = sortProperty(a, b);
      return ca > cb ? 1 : -1;
    });

    if (sortOrder.reverse) {
      presentations = presentations?.reverse();
    }

    return presentations;
  }
}

export default PresentationsComponent;
