import React, { useState } from 'react';
import axios from 'axios';

function GetWebServerHistory() {
  const [url, setUrl] = useState(''); // State for the input URL
  const [webServerData, setWebServerData] = useState([]); // State for server history data
  const [error, setError] = useState(null); // State for error handling

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await axios.get('http://localhost:3030/api/v1/webservers/history', {
        params: { url }, // Pass the URL as a query parameter
      });

      const serverData = response.data; // Data from the server
      console.log(serverData);
      
      // Ensure data is an array before setting it in state
      const cleanedData = Array.isArray(serverData) ? serverData : [];

      setWebServerData(cleanedData); // Update state with fetched history data
      setError(null); // Reset error state
    } catch (err) {
      setError(`Error fetching web server history: ${err.message}`); // Set error message
    }
  };

  return (
    <div>
      <h2>Get Web Server History</h2>

      {/* Form to get history of a specific web server */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Web Server URL:</label>
          <input 
            type="text" 
            value={url} 
            onChange={(e) => setUrl(e.target.value)} 
            placeholder="Enter Web Server URL"
          />
        </div>
        <button type="submit">Get History</button>
      

      {/* Display error message if any */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display fetched web server history */}
      {webServerData.length > 0 ? (
        <div>
          <h3>Web Server Requests History</h3>
          <table border="1" style={{ width: '100%', textAlign: 'left' }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>URL</th>
                <th>Success</th>
              </tr>
            </thead>
            <tbody>
              {webServerData.map((ws, index) => (
                <tr key={index}>
                  <td>{ws.name}</td>
                  <td>
                    <a href={ws.url} target="_blank" rel="noopener noreferrer">
                      {ws.url}
                    </a>
                  </td>
                  <td>{ws.success ? 'True' : 'False'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No history found for this web server.</p>
      )}
      </form>
    </div>
  );
}

export default GetWebServerHistory;
