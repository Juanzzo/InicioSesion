import { MovieProvider } from "./context/MovieContext";
import MovieList from "./components/MovieList";
import { Provider } from "react-redux";
import store from "./store";
import LoginForm from "./features/auth/components/LoginForm";
import Dashboard from "./features/auth/components/Dashboard";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Cart from "./features/cart/components/Cart";
import CartButton from "./features/cart/components/CartButton";
import AdminDashboard from "./features/products/AdminDashboard";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const user = useSelector(state => state.auth.user);
  const navigate = useNavigate();
  return (
    <MovieProvider>
      <div style={{ padding: "1rem" }}>
        <h1>🎬 CinematicField</h1>
z           {user?.role === "admin" && (
          <button
            style={{
              display: "inline-block",
              marginBottom: "1rem",
              background: "#00ffcc",
              color: "#181818",
              border: "none",
              borderRadius: 8,
              padding: "0.5rem 1.5rem",
              fontWeight: "bold",
              cursor: "pointer"
            }}
            onClick={() => navigate("/admin")}
          >
            Ir al Panel Admin
          </button>
        )}
        <CartButton />
        <Cart />
        <MovieList />
      </div>
    </MovieProvider>
  );
}

const Home = () => (
  <MainPage />
);

const AppRoutes = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);
  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginForm />} />
      <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
      <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/admin" element={isAuthenticated && user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/login" />} />
    </Routes>
  );
};

const App = () => (
  <Provider store={store}>
    <Router>
      <AppRoutes />
    </Router>
  </Provider>
);

export default App;

