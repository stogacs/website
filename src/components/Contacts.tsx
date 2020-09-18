import React from "react";
import Container from "react-bootstrap/Container";

import { Contacts } from "@data/models/Contacts";

export type ContactsProps = Contacts;

export class ContactsComponent extends React.Component<ContactsProps> {
  render(): React.ReactNode {
    return <Container></Container>;
  }
}
