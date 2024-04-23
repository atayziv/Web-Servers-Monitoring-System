import React, { useState } from "react";
import axios from "axios";

function GetWebServerInfo() {
  const [url, setUrl] = useState(""); // State for input URL
  const [webServerData, setWebServerData] = useState([]); // State for server data
  const [error, setError] = useState(null); // State for error handling

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form default behavior
    try {
      // Use GET request with query parameter to pass the URL
      const response = await axios.get("http://localhost:3030/api/v1/webservers/get", {
        params: { url }, // Pass the 'url' as a query parameter
      });

      const serverData = response.data; // Data from the server
      console.log(serverData)
      const cleanedData = Array.isArray(serverData) ? serverData : []; // Ensure it's an array

      setWebServerData(cleanedData); // Set state with cleaned data
      setError(null); // Reset error state
    } catch (err) {
      setError(`Error fetching data: ${err.message}`); // Set error message
    }
  };

  const currentStatus = webServerData[0]?.status; // Get current status
  const statusStyle = currentStatus === "Healthy"
    ? { color: "green", fontWeight: "bold" } // Green and bold for "Healthy"
    : currentStatus === "Unhealthy"
    ? { color: "red", fontWeight: "bold" } // Red and bold for "Unhealthy"
    : {}; // Default style if not specified

  return (
    <div>
      <h2>Get Web Server Information</h2>

      {/* Form to get web server information */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Web Server URL:</label>
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
        </div>
        <button type="submit">Get Web Server Info</button>
      </form>

      {/* Display error message if any */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display web server details */}
      {webServerData.length > 0 && (
        <div>
          <h3>Web Server Details</h3>
          <p>
            Current Webserver Status: <span style={statusStyle}>{currentStatus}</span>
          </p>
          <table>
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
                  <td><a href={ws.url}>{ws.url}</a></td>
                  <td>{ws.success ? "True" : "False"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default GetWebServerInfo;
