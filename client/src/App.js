import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header"
import LoginPage from "./pages/Login/LoginPage";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />

        {/* page routes */}
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
