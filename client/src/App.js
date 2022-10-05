import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header"
import LoginPage from "./pages/Login/LoginPage";
import SignupPage from "./pages/Signup/SignupPage";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />

        {/* page routes */}
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/signup" element={<SignupPage />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
