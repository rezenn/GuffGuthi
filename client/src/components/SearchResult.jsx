import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Post from "./postINhome/Post";

const SearchResults = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const searchQuery = queryParams.get("query"); // Extract query from URL

  const [results, setResults] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      const fetchResults = async () => {
        try {
          const response = await fetch(
            `http://localhost:8000/search?query=${searchQuery}`
          );
          const data = await response.json();
          setResults(data); // Assuming the API returns results
        } catch (error) {
          console.error("Error fetching search results", error);
        }
      };

      fetchResults();
    }
  }, [searchQuery]);

  return (
    <div>
      <Navbar className="Navbar" activePage="home" setActivePage={() => {}} />
      <div style={{ marginLeft: "500px", marginTop: "130px" }}>
        <h1>Search Results for "{searchQuery}"</h1>
        <ul>
          {results.length > 0 ? (
            results.map((result, index) => (
              // <li key={index}>
              //   <h3>{results.post_title}</h3>
              //   <p>By {results.name}</p>
              //   <p>
              //     Posted on: {new Date(results.created_at).toLocaleString()}
              //   </p>
              // </li>
              <Post />
            ))
          ) : (
            <p>No results found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SearchResults;
