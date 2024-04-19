const pool = require('./db');
const config = require('../config');
const queries = require('./queries');
const axios = require('axios');
const { performance } = require('perf_hooks');

console.log('Starts monitoring the webservers ...')
setInterval(myTimer, config.monitorInterval);
async function myTimer() {
    pool.connect();
    pool.query(queries.getWebservers, async (err, res) => {
        if (err) throw err;
        const urls = res.rows;
        const promises = urls.map(({ url, name }) => monitorUrl(url, name));
        await Promise.all(promises);
    });
}

async function monitorUrl(url,name) {
    var startTime = performance.now();
    try {
        const response = await axios.get(url);
        var endTime = performance.now();
        var latency = (endTime - startTime) * 0.001;
        if (response.status >= 200 && response.status < 300 && latency < config.maxLatency) {
            // Insert successful request into database
            await pool.query(queries.insert2requestDB, [name, url, true]);
        } else {
            // Insert failed request into database
            await pool.query(queries.insert2requestDB, [name, url, false]);
        }
    } catch (error) {
        console.error(`Error monitoring URL ${url}: ${error.message}`);
        // Insert failed request into database
        await pool.query(queries.insert2requestDB, [name, url, false]);
    }
    finally{
        const last5Requests = await pool.query(queries.getLast5requests, [url]);
        const last3Requests = await pool.query(queries.getLast3requests, [url]);
        if (last5Requests.rows[0].success_count == 5){
            await pool.query(queries.updateWebServerStatus,["Healthy",url])
        } else if (last3Requests.rows[0].unsuccess_count == 3) {
            await pool.query(queries.updateWebServerStatus,["Unhealthy",url])
        }
    }
}
