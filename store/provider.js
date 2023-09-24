"use cleint";

import { Provider } from "react-redux";
import { store } from "./createConfigue/Store";

const Providerr = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providerr;
