import { createContext, useState } from "react";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const fetchMovies = async (search, page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const apiKey = import.meta.env.VITE_OMDB_API_KEY;
      const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${search}&page=${page}`);
      const data = await response.json();
      if (data.Response === "True") {
        console.log("API returned movies count:", data.Search.length, "Total results:", data.totalResults);
        setMovies(data.Search);
        setTotalResults(parseInt(data.totalResults, 10));
        setCurrentPage(page);
      } else {
        setError(data.Error);
        setMovies([]);
        setTotalResults(0);
      }
    } catch {
      setError("Error fetching movies");
      setMovies([]);
      setTotalResults(0);
    }
    setLoading(false);
  };

  return (
    <MovieContext.Provider value={{ movies, loading, error, fetchMovies, currentPage, totalResults }}>
      {children}
    </MovieContext.Provider>
  );
};
