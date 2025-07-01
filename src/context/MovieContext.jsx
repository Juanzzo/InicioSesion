import { createContext, useEffect, useState } from "react";



export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchMovies = async (search = "batman", page = 1) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `http://www.omdbapi.com/?i=tt3896198&apikey=3e75514e&s=${search}&page=${page}`
      );
      const data = await res.json();
      if (data.Response === "True") {
        setMovies(data.Search);
        setTotalResults(parseInt(data.totalResults, 10));
        setCurrentPage(page);
      } else {
        setMovies([]);
        setTotalResults(0);
        setError(data.Error || "No se encontraron resultados.");
      }
    } catch {
      setError("Error al conectar con la API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies("batman", 1);
  }, []);

  return (
    <MovieContext.Provider
      value={{ movies, loading, error, fetchMovies, totalResults, currentPage }}
    >
      {children}
    </MovieContext.Provider>
  );
};
