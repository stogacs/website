import React from "react";
import { Helmet } from "react-helmet";

const ROOT_TITLE = "StogaCS";
const SEPARATOR = " | ";

type TitleProps = { parts?: string[] };

const Title: React.FC<TitleProps> = ({ parts }: TitleProps) => {
  let str = ROOT_TITLE;
  if (parts && parts.length > 0) {
    str += SEPARATOR + parts.join(SEPARATOR);
  }

  return (
    <Helmet>
      <title>{str}</title>
    </Helmet>
  );
};

export default Title;
