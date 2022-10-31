import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Page from "./components/Page";
import Footer from "./components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContextProvider from "./contexts/AuthContext";
import "@stripe/stripe-js";


function App() {
  return (
    <Router>
      <Page />
      <ToastContainer
        theme="colored"
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default App;
