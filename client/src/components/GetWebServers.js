import React, { useEffect, useState } from 'react';
import axios from 'axios';

function GetWebServers() {
  const [webServers, setWebServers] = useState([]);

  useEffect(() => {
    async function fetchWebServers() {
      try {
        const response = await axios.request({
          method: 'GET',
          url: 'http://localhost:3030/api/v1/webservers/',
        });
        const serverData = response.data;
        // Handle cases where serverData might be an array of arrays
        setWebServers(
          Array.isArray(serverData) && Array.isArray(serverData[0])
            ? serverData[0]
            : serverData
        );
      } catch (error) {
        console.error('Error fetching web servers', error);
      }
    }

    fetchWebServers();
  }, []); // Fetch once on component mount

  return (
    <div>
      <h2>List of Web Servers</h2>
      {Array.isArray(webServers) ? (
        <table border="1" style={{ width: '100%', textAlign: 'left' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>URL</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {webServers.map((server, index) => (
              <tr key={index}>
                <td>{server.name}</td>
                <td>
                  <a href={server.url} target="_blank" rel="noopener noreferrer">
                    {server.url}
                  </a>
                </td>
                <td>{server.status ? server.status : 'Unknown'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No web servers found.</p>
      )}
    </div>
  );
}

export default GetWebServers;
