import React from "react";
import { AppProvider } from "./hooks";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

import Routes from "./routes";

// npm install -g firebase-tools
// firebase login
// firebase init
// firebase serve //localhost
// firebase deploy

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
