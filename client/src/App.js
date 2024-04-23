import React, { useState } from 'react';
import InsertWebServer from './components/InsertWebServer';
import GetWebServers from './components/GetWebServers';
import GetWebServer from './components/GetWebServerInfo';
import UpdateWebServer from './components/UpdateWebServer';
import RemoveWebServer from './components/RemoveWebServer';

function App() {
  // State to track the current section (CRUD operation)
  const [currentSection, setCurrentSection] = useState('insert'); // Default to insert

  const renderContent = () => {
    switch (currentSection) {
      case 'insert webserver':
        return <InsertWebServer />;
      case 'get webserver':
        return <GetWebServer />;
      case 'get webservers':
        return <GetWebServers />;
      case 'update':
        return <UpdateWebServer />;
      case 'remove':
        return <RemoveWebServer />;
      default:
        return <div>Select an operation from the menu.</div>;
    }
  };

  return (
    <div>
      <h1>Monitoring Web Servers</h1>
      {/* Navigation menu */}
      <nav>
        <ul>
          <li onClick={() => setCurrentSection('insert webserver')}>Insert Web Server</li>
          <li onClick={() => setCurrentSection('get webserver')}>Get Web Server Information</li>
          <li onClick={() => setCurrentSection('get webservers')}>Get Web Servers</li>
          <li onClick={() => setCurrentSection('update')}>Update Web Server</li>
          <li onClick={() => setCurrentSection('remove')}>Remove Web Server</li>
        </ul>
      </nav>
      {/* Content based on current section */}
      <div>
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
