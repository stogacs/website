import React from "react";
import Dropzone from "react-dropzone";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import FileUpload from "./FileUpload";

// import "./mstquery.py";

export interface MSTQueryProps {}

export interface MSTQueryState {
  showFileUpload: boolean;
}

class MSTQueryComponent extends React.Component<MSTQueryProps, MSTQueryState> {
  constructor(props: MSTQueryProps) {
    super(props);

    this.state = {
      showFileUpload: true,
    };
  }

  render(): React.ReactNode {
    const body = this.state.showFileUpload ? (
      <FileUpload callback={this.handleFileContents.bind(this)} />
    ) : (
      <div />
    );
    return (
      <section className="mstquery-section">
        <Container>
          <Row>
            <Col lg={12} className="text-center">
              {body}
            </Col>
          </Row>
        </Container>
      </section>
    );
  }

  private handleFileContents(contents: string | ArrayBuffer): void {
    if (!contents) {
      return;
    }

    console.log(contents);

    this.setState({ showFileUpload: false });
  }
}

export default MSTQueryComponent;
