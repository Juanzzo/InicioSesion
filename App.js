import { MovieProvider } from "./shared/contexts/MovieContext";
import MovieList from "./shared/components/MovieList";

const App = () => {
  return (
    <MovieProvider>
      <div style={{ padding: "1rem" }}>
        <h1>🎬 Buscador de Películas</h1>
        <MovieList />
      </div>
    </MovieProvider>
  );
};

export default App;
