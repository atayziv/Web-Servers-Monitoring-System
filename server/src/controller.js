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
    const url = req.params.url;
    console.log("url= "+url);
    console.log(req.params)
    try {
        const results = await pool.query(queries.getWebServerById, [url]);
        res.status(200).json(results.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};

const addWebServer = async (req, res) => {
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
    const url = req.params.url;
    try {
        const results = await pool.query(queries.getWebServerById, [url]);
        if (!results.rows.length) {
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
    const url = req.params.url;
    const { name } = req.body;
    console.log("in updateWebServer,name = " +name);
    try {
        const results = await pool.query(queries.getWebServerById, [url]);
        if (!results.rows.length) {
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
    const url = req.params.url;
    try {
        const results = await pool.query(queries.getWebServerHistory, [url]);
        res.status(200).json(results.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};

module.exports = {
    getWebservers,
    getWebServerById,
    addWebServer,
    removeWebServer,
    updateWebServer,
    getWebServerHistory,
};
