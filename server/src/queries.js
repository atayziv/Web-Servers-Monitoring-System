const getWebservers = "SELECT * FROM webservers";
const getWebServerById= "WITH last_10_calls AS (SELECT url, name, success FROM requestdb WHERE url = $1 ORDER BY index DESC LIMIT 10 ) SELECT webservers.name,webservers.url,last_10_calls.success,webservers.status FROM webservers JOIN last_10_calls ON last_10_calls.url = webservers.url";
const checkUrlExists = "SELECT url FROM webservers WHERE url = $1";
const addWebServer = "INSERT INTO webservers (name,url) VALUES ($1,$2)";
const removeWebServer = "DELETE FROM webservers WHERE url = $1";
const updateWebServer = "UPDATE webservers SET name = $1 WHERE url = $2";
const updateWebServerStatus = "UPDATE webservers SET status = $1 WHERE url = $2";
const getWebServerHistory = "SELECT * FROM requestdb WHERE url = $1";
const getLast5requests = "SELECT COUNT(*) as success_count FROM (SELECT index FROM requestdb WHERE url = $1 AND success = true ORDER BY index DESC LIMIT 5) AS last_5_requests;";
const getLast3requests = "SELECT COUNT(*) as unsuccess_count FROM (SELECT index FROM requestdb WHERE url = $1 AND success = false ORDER BY index DESC LIMIT 3) AS last_3_requests;";
const insert2requestDB = "INSERT INTO requestdb (name,url,success) VALUES ($1,$2,$3)"

module .exports= {
    getWebservers,
    getWebServerById,
    checkUrlExists,
    addWebServer,
    removeWebServer,
    updateWebServer,
    updateWebServerStatus,
    getWebServerHistory,
    getLast5requests,
    getLast3requests,
    insert2requestDB
};