import React, { useState } from 'react';
import axios from 'axios';

function InsertWebServer() {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        url: url,
        name: name,
      };
      axios.request({ method: "POST", url: 'http://localhost:3030/api/v1/webservers/insert', data});
      setMessage('Web server inserted successfully');
      setName('');
      setUrl('');
    } catch (error) {
      setMessage(`Error inserting web server: ${error}`);
    }
  };

  return (
    <div>
      <h2>Insert Web Server</h2>
      {message && <p>{message}</p>}
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
