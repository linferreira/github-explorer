import React from "react";

export function RepositoryItem(props) {
  return (
    <li>
      <strong>{props.repository}</strong>
      <p>forms in React</p>
      <a>Acessar repositório</a>
    </li>
  );
}
