import React, { useState } from 'react';
import axios from 'axios';

function RemoveWebServer() {
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        url: url,
      };
      axios.request({ method: "DELETE", url: 'http://localhost:3030/api/v1/webservers/remove', data});
      setMessage('Web server removed successfully');
      setUrl('');
    } catch (error) {
      setMessage(`Error removing web server: ${error}`);
    }
  };

  return (
    <div>
      <h2>Remove Web Server</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>URL:</label>
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
        </div>
        <button type="submit">Remove Web Server</button>
      </form>
    </div>
  );
}

export default RemoveWebServer;
