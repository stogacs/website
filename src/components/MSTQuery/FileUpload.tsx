import React from "react";
import Dropzone from "react-dropzone";

export interface FileUploadProps {
  callback: (s: string | ArrayBuffer) => void;
}

class FileUpload extends React.Component<FileUploadProps> {
  render(): React.ReactNode {
    return (
      <Dropzone onDrop={this.onDropFiles.bind(this)}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>{"Drag 'n' drop your file here, or click to select file"}</p>
            </div>
          </section>
        )}
      </Dropzone>
    );
  }

  private async onDropFiles(files: File[]): Promise<void> {
    const file = files[0];
    const contents = await this.readFile(file);
    if (!contents) {
      this.showErrorPopup();
      return;
    }

    this.props.callback(contents);
  }

  private async readFile(file: File): Promise<string | ArrayBuffer | null> {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onerror = () => {
        reader.abort();
        reject(new DOMException("Problem parsing input file."));
      };
      reader.onabort = () => this.showErrorPopup();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.readAsText(file);
    });
  }

  private showErrorPopup() {
    console.log("Error!");
  }
}

export default FileUpload;
