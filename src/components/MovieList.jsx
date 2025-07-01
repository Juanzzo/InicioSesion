import { useContext, useState } from "react";
import { MovieContext } from "../context/MovieContext";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";

const MovieList = () => {
  const { movies, loading, error, fetchMovies, totalResults, currentPage } = useContext(MovieContext);
  const [search, setSearch] = useState("batman");

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      fetchMovies(search, 1);
    }
  };

  const handlePageChange = (page) => {
    fetchMovies(search, page);
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

      <Pagination
        currentPage={currentPage}
        totalResults={totalResults}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default MovieList;
