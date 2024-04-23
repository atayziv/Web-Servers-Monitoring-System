import React, { useState } from 'react';
import { HttpClient } from '../services/http-client';

function InsertWebServer() {
  // State variables to store form data
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make POST request to insert a new web server
      const data = {
        name: name,
        url: url,
      };

      await HttpClient.sendRequestToServer('POST', 'http://localhost:3000/api/v1/webservers/', data);
      
      // Display success message
      setMessage('Web server inserted successfully');
      
      // Clear form fields
      setName('');
      setUrl('');
    } catch (error) {
      // Display error message
      setMessage('Error inserting web server');
    }
  };

  return (
    <div>
      <h2>Insert Web Server</h2>
      {/* Display message */}
      {message && <p>{message}</p>}
      
      {/* Form to insert web server */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>URL:</label>
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
        </div>
        <button type="submit">Insert Web Server</button>
      </form>
    </div>
  );
}

export default InsertWebServer;
