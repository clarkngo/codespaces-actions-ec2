import React, { useState, useEffect } from 'react';

// Access the API URL from environment variables
const API_URL = process.env.REACT_APP_API_URL;

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [moviesData, setMoviesData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMovies = async () => {
    try {
      const response = await fetch(`${API_URL}/movies`);
      const data = await response.json();
      const formattedData = data.map(movie => ({
        title: movie.title,
        year: movie.year,
        genres: movie.genres,
        cast: movie.cast
      }));
      setMoviesData(formattedData);
      setFilteredData(formattedData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    const filteredMovies = moviesData.filter(movie =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredMovies);
  }, [searchTerm, moviesData]);

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loader}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Movie List</h1>
      <input
        style={styles.searchInput}
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <ul style={styles.list}>
        {filteredData.map((item, index) => (
          <li key={index} style={styles.listItem}>
            <h2 style={styles.itemTitle}>{item.title}</h2>
            <p style={styles.itemText}>Year: {item.year}</p>
            <p style={styles.itemText}>Genres: {item.genres.join(', ')}</p>
            <p style={styles.itemText}>Cast: {item.cast.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Styles in standard CSS or using inline styles
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#fff',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  searchInput: {
    height: '40px',
    borderColor: 'gray',
    borderWidth: '1px',
    marginBottom: '20px',
    paddingHorizontal: '10px',
    width: '100%',
    boxSizing: 'border-box',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    borderBottomWidth: '1px',
    borderBottomColor: '#ccc',
    borderBottomStyle: 'solid',
    padding: '10px 0',
  },
  itemTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  itemText: {
    fontSize: '14px',
  },
  loader: {
    fontSize: '20px',
    color: '#0000ff',
  },
};

export default App;
