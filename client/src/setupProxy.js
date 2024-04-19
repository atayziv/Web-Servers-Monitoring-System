/* eslint-disable */

/*
 * This file only supports Node's JavaScript syntax.
 * This is the reason eslint is disabled and the file's type is `.js` instead of `.ts`.
 * For more information, please check this project's `README.md` in the `setupProxy.js` file section.
 */

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
    app.use(
        "/api*",
        createProxyMiddleware({
            target: "http://localhost:3001",
            changeOrigin: true,
        }),
    );
};
