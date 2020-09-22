import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import GlobalNavLinks from "./GlobalNavLinks";

export interface StyledNavbarProps {
  children: React.ReactNode;
}

export class StyledNavbar extends React.Component<StyledNavbarProps> {
  render(): React.ReactNode {
    return (
      <Navbar fixed="top" variant="dark" bg="dark" expand="lg" className="topnav pb-1 pt-1">
        <Container className="pr-0 pl-0">
          <Navbar.Brand href="#home" className="navbar-title text-muted">
            STOGACS
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav variant="pills" className="ml-auto">
              {this.props.children}
              <GlobalNavLinks />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default StyledNavbar;
