import Navbar from "./components/Header/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ProtectedRoute } from "protected-route-react";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Home from "./components/Home";
import PassengerDetails from "./components/Form/PassengerDetails";
import Reservations from "./components/Reservations/Reservations";
import { Toaster } from "react-hot-toast";
import 'react-responsive-modal/styles.css';

function App() {
  const { isAuthenticated, user, message, error } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      dispatch({ type: "clearError" });
    }

    if (message) {
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message]);

  return (
    <>
      <Toaster position="top-right" />
      <div className="h-screen flex-1 pt-0 pl-0">
        <Navbar isAuthenticated={isAuthenticated} user={user} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Home user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/:objectid"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <PassengerDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reservations"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Reservations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/">
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/">
                <Register />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
