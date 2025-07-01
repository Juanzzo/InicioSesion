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

const MainPage = () => (
  <MovieProvider>
    <div style={{ padding: "1rem" }}>
      <h1>🎬 CinematicField</h1>
      <CartButton />
      <Cart />
      <MovieList />
    </div>
  </MovieProvider>
);

const Home = () => (
  <MainPage />
);

const AppRoutes = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginForm />} />
      <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
      <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
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

