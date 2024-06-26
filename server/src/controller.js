const pool = require('./db');
const queries = require('./queries');

const getWebservers = async (req, res) => {
    try {
        const results = await pool.query(queries.getWebservers);
        res.status(200).json([results.rows]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};

const getWebServerById = async (req, res) => {
    try {
        const { url } = req.query; // Get the 'url' from query parameters
        if (!url) {
            return res.status(400).json({ error: "Missing URL parameter" }); // Return error if no URL is provided
        }
        const results = await pool.query(queries.getWebServerById, [url]); // Query database with 'url'
        if (results.rows.length === 0) {
            return res.status(404).json({ error: "Web server not found" }); // Return error if no records are found
        }
        res.status(200).json(results.rows); // Return the query results
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error"); // Handle server errors
    }
  };

const addWebServer = async (req, res) => {
    console.log(req.body);
    const { name, url } = req.body;
    try {
        const existingWebServer = await pool.query(queries.checkUrlExists, [url]);
        if (existingWebServer.rows.length) {
            res.status(400).send('The web server already exists');
            return;
        }
        await pool.query(queries.addWebServer, [name, url]);
        res.status(201).send('Web server created successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};

const removeWebServer = async (req, res) => {
    var {url} = req.body;
    try {
        const results = await pool.query(queries.getWebServerById, [url]);
        if (!results) {
            res.status(404).send('Web server not found');
            return;
        }
        await pool.query(queries.removeWebServer, [url]);
        res.status(200).send('Web server removed successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};

const updateWebServer = async (req, res) => {
    var { url,name } = req.body;
    try {
        const results = await pool.query(queries.getWebServerById, [url]);
        if (!results) {
            res.status(404).send('Web server not found');
            return;
        }
        await pool.query(queries.updateWebServer, [name, url]);
        res.status(200).send('Web server updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};

const getWebServerHistory = async (req, res) => {
    try {
        const { url } = req.query; // Get the 'url' from query parameters
        if (!url) {
            return res.status(400).json({ error: "Missing URL parameter" }); // Return error if no URL is provided
        }
        const results = await pool.query(queries.getWebServerHistory, [url]); // Query database with 'url'
        if (results.rows.length === 0) {
            return res.status(404).json({ error: "Web server not found" }); // Return error if no records are found
        }
        res.status(200).json(results.rows); // Return the query results
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error"); // Handle server errors
    };
};

module.exports = {
    getWebservers,
    getWebServerById,
    addWebServer,
    removeWebServer,
    updateWebServer,
    getWebServerHistory,
};
