import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Media from "react-bootstrap/Media";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library, IconName, IconProp, IconPrefix } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fab, fas);

import { Contacts, Link, ContactsService } from "@data/Contacts";
import { splitChunks } from "@util";

export interface ContactsProps {}

interface ContactsState {
  data?: Contacts;
}

export class ContactsComponent extends React.Component<ContactsProps, ContactsState> {
  service: ContactsService;

  constructor(props: ContactsProps) {
    super(props);
    this.service = new ContactsService();
    this.state = {};

    this.service.fetch().then((data) => this.setState({ data: data }));
  }

  render(): React.ReactNode {
    const data = this.state.data;
    if (!data) {
      return <Container>Loading...</Container>;
    }

    const linkIcon = (link: Link) => {
      let icon: IconProp;
      if (typeof link.icon === "string") {
        icon = ["fas", link.icon as IconName];
      } else {
        icon = [link.icon.set as IconPrefix, link.icon.name as IconName];
      }
      return icon;
    };

    const linkComponents = data.links.map((link) => {
      const icon = linkIcon(link);
      return (
        <a key={link.url} href={link.url} className="contacts-link">
          <FontAwesomeIcon icon={icon} size="lg" />
        </a>
      );
    });

    const peopleComponents = data.people.map((person) => {
      const links = person.links.map((link) => {
        const icon = linkIcon(link);
        return (
          <h5 key={link.url} className="mb-2">
            <a href={link.url} className="contacts-link">
              <FontAwesomeIcon icon={icon} size="lg" />
              <span className="ml-2">{link.name}</span>
            </a>
          </h5>
        );
      });
      return (
        <Col key={person.name} className="m-4">
          <Media>
            <img
              width={200}
              height={200}
              className="align-self-start rounded-circle"
              src={person.photo}
            />
            <Media.Body className="mt-2 ml-3">
              <h4>
                <strong>{person.name}</strong>
              </h4>
              <h5>{person.position}</h5>
              <div className="ml-3">{links}</div>
            </Media.Body>
          </Media>
        </Col>
      );
    });

    const peopleChunks = splitChunks(peopleComponents, 3).map((chunk) => (
      <Row key="" className="justify-content-center mb-3">
        {chunk}
      </Row>
    ));

    return (
      <section className="contacts-section bg-dark">
        <Container fluid>
          <Row className="text-uppercase mb-5">
            <Col lg={12}>
              <h2 className="contacts-heading text-light text-center">Contacts</h2>
            </Col>
          </Row>
          <Row className="justify-content-center mb-4">{peopleChunks}</Row>
          <Row className="contacts-alinks-container justify-content-center">{linkComponents}</Row>
        </Container>
      </section>
    );
  }
}
