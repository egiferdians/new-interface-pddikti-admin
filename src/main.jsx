import { h, render } from "preact";
import App from "./App";
import "./index.css";
import logo from "./assets/img/logo-pddikti.svg";

const link =
  document.querySelector("link[rel~='icon']") ||
  document.createElement("link");
link.rel = "icon";
link.type = "image/png";
link.href = logo;
document.getElementsByTagName("head")[0].appendChild(link);

render(<App />, document.getElementById("app"));