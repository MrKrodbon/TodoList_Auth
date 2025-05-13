import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import { Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RestrictedRoute from "./components/RestrictedRoute";
import { useSelector } from "react-redux";
import { selectIsUserLoggedIn } from "./redux/auth/selectors";

function App() {
  const isUserLoggedIn = useSelector(selectIsUserLoggedIn);
  return (
    <Routes>
      <Route
        path="/register"
        element={<RestrictedRoute component={<RegisterPage />} />}
      />
      <Route
        path="/login"
        element={<RestrictedRoute component={<LoginPage />} />}
      />
      <Route
        path="/todos"
        element={isUserLoggedIn ? <HomePage /> : <RegisterPage />}
      />
    </Routes>
  );
}

export default App;
