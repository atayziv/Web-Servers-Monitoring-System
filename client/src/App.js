// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InsertWebServer from './components/InsertWebServer';
// import GetWebServer from './components/GetWebServer';
// import UpdateWebServer from './components/UpdateWebServer';
// import RemoveWebServer from './components/RemoveWebServer';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/insert" component={<InsertWebServer/>} />
          {/* <Route path="/get" component={GetWebServer} />
          <Route path="/update" component={UpdateWebServer} />
          <Route path="/remove" component={RemoveWebServer} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
