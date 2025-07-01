import { useContext, useState } from "react";
import { MovieContext } from "../contexts/MovieContext";
import MovieCard from "./MovieCard";

const MovieList = () => {
  const { movies, loading, error, fetchMovies, currentPage, totalResults } = useContext(MovieContext);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      fetchMovies(search, 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      fetchMovies(search, currentPage - 1);
    }
  };

  const handleNext = () => {
    const totalPages = Math.ceil(totalResults / 10);
    if (currentPage < totalPages) {
      fetchMovies(search, currentPage + 1);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          placeholder="Buscar película"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "1rem" }}>
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>

      {totalResults > 10 && (
        <div style={{ marginTop: "1rem" }}>
          <button onClick={handlePrevious} disabled={currentPage === 1}>
            Anterior
          </button>
          <span style={{ margin: "0 1rem" }}>
            Página {currentPage} de {Math.ceil(totalResults / 10)}
          </span>
          <button onClick={handleNext} disabled={currentPage === Math.ceil(totalResults / 10)}>
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieList;
