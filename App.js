import React from "react";
import { Provider } from "react-redux";
import "expo-dev-menu";

import { store } from "./src/redux/store";
import Main from "./src/components/Main/Main";

export default function App() {
  return (
    <Provider store={store}>
      <Main></Main>
    </Provider>
  );
}
