import "sugar";
import "source-map-support/register";
import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import state from "./state";

const app = <App state={state} />;

ReactDOM.render(app, document.querySelector("#root"));
