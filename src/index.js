import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./styles/forgotpassword.css";
import "./styles/login.css";
import "./styles/pricing.css";
import "./styles/faqs.css";
import "./styles/order_success.css";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux/store/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </PersistGate>
);
