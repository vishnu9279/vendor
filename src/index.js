import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./styles/forgotpassword.css";
import "./styles/login.css";
import "./styles/pricing.css";
import "./styles/faqs.css";
import "./styles/order_success.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
