import React, { useState } from 'react';
import axios from 'axios';

function UpdateWebServer() {
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
      axios.request({ method: "PUT", url: 'http://localhost:3030/api/v1/webservers/update', data});
      setMessage('Web server updated successfully');
      setName('');
      setUrl('');
    } catch (error) {
      setMessage(`Error updating web server: ${error}`);
    }
  };

  return (
    <div>
      <h2>Update Web Server</h2>
      <p style={{ fontStyle: 'italic', color: 'gray' }}>
        You can only update the webserver name.
      </p>
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
        <button type="submit">Update Web Server</button>
      </form>
    </div>
  );
}

export default UpdateWebServer;
