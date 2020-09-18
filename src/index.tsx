import ReactDOM from "react-dom";
import React from "react";

import { RootComponent } from "@components/Root";
import { ExperienceProps } from "@components/Experiences";

import "@assets/styles/styles.scss";

import experiencesData from "@data/experiences.json";
import pictures from "@data/images";

ReactDOM.render(
  <RootComponent
    experiences={experiencesData as ExperienceProps}
    pictures={pictures}
  ></RootComponent>,
  document.body,
);
