import React from "react";

const ButtonLink = ({ buttonProps = {}, label, url }) => (
  <a href={url} target="_blank" rel="noopener noreferrer">
    <button className="button" {...buttonProps}>
      {label}
    </button>
  </a>
);

export default ButtonLink;
