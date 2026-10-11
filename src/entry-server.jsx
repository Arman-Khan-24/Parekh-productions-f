import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "./App.jsx";

export function render(path) {
  return ReactDOMServer.renderToString(
    React.createElement(App, { initialPath: path })
  );
}
