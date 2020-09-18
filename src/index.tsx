import ReactDOM from "react-dom";
import React from "react";

import { RootComponent } from "@components/Root";
import { ExperiencesProps } from "@components/Experiences";
import { PicturesProps } from "@components/Pictures";
import { ContactsProps } from "@components/Contacts";

import "@assets/styles/styles.scss";

import experiences from "@data/experiences.json";
import pictures from "@data/images";
import contacts from "@data/contacts.json";

const picturesProps: PicturesProps = {
  pictures: pictures,
};

ReactDOM.render(
  <RootComponent
    experiences={experiences as ExperiencesProps}
    pictures={picturesProps}
    contacts={contacts as ContactsProps}
  ></RootComponent>,
  document.body,
);
