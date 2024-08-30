import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchListings = () => {
    setLoading(true);
    axios.get('http://localhost:5000/api/listings/scrape')
      .then(response => {
        setListings(response.data.listings);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching listings:', error);
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <h1>Real Estate Listings</h1>
      <button onClick={fetchListings}>Scrape Listings</button>
      {loading && <p>Loading...</p>}
      <ul>
        {listings.map((listing, index) => (
          <li key={index}>
            <h2>{listing.title}</h2>
            <p>{listing.price}</p>
            <p>{listing.location}</p>
            <a href={listing.url} target="_blank" rel="noopener noreferrer">View Listing</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
