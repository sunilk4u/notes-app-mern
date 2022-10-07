import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import UserDetails from "./components/UserDetails/UserDetails";
import LoginPage from "./pages/Login/LoginPage";
import NotesPage from "./pages/Notes/NotesPage";
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
          <Route
            exact
            path="/user"
            element={
              <ProtectedRoute>
                <UserDetails />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/notes"
            element={
              <ProtectedRoute>
                <NotesPage />
              </ProtectedRoute>
            }
          />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
