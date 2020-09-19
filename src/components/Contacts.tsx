import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Media from "react-bootstrap/Media";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library, IconName, IconProp, IconPrefix } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fab, fas);

import { Contacts, ContactsService } from "@data/Contacts";

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

    const linkComponents = data.links.map((link) => {
      let icon: IconProp;
      if (typeof link.icon === "string") {
        icon = ["fas", link.icon as IconName];
      } else {
        icon = [link.icon.set as IconPrefix, link.icon.name as IconName];
      }
      return (
        <a key={link.url} href={link.url}>
          <FontAwesomeIcon icon={icon} />
        </a>
      );
    });

    const peopleComponents = data.people.map((person) => {
      return (
        <Media key={person.name}>
          <img width={128} height={128} className="align-self-start mr-3" src={person.photo} />
          <Media.Body>
            <h5>
              <strong>{person.name}</strong> ({person.position})
            </h5>
          </Media.Body>
        </Media>
      );
    });

    return (
      <Container>
        <Row>{peopleComponents}</Row>
        <Row className="justify-content-center">{linkComponents}</Row>
      </Container>
    );
  }
}
