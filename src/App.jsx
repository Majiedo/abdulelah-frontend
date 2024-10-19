import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import BookDetails from "./pages/BookDetails";
import SignIn from "./pages/SignIn";
import Books from "./pages/Books";
import { isAuthenticated } from "./helper";
import SignUp from "./pages/SignUp";
import Admin from "./pages/Admin";

function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/sign-in" />;
}

function PublicRoute({ children }) {
  return !isAuthenticated() ? children : <Navigate to="/" />;
}

function AdminRoute({ children }) {
  return isAuthenticated() &&
    JSON.parse(localStorage.getItem("user")).role !== "STUDENT" ? (
    children
  ) : (
    <Navigate to="/" />
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Books />} />
      <Route path="/books" element={<Books />} />
      <Route
        path="/sign-in"
        element={
          <PublicRoute>
            <SignIn />
          </PublicRoute>
        }
      />
      <Route
        path="/sign-up"
        element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        }
      />
      <Route
        path="/books/:slug"
        element={
          <PrivateRoute>
            <BookDetails />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <Admin />
          </AdminRoute>
        }
      />
    </Routes>
  );
}

export default App;
