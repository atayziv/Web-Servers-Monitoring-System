const axios = require("axios");
const Logger = require("./logger");

class HttpClient {
    static async sendRequestToServer(method, url, data = null, responseType = null) {
        const axiosRequestConfig = {
            method: method,
            url: url,
            data: data,
            responseType: responseType,
        };

        let response;

        try {
            response = await axios.request(axiosRequestConfig);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                HttpClient.logAxiosError(error);
            }
            throw error;
        }

        return response.data;
    }


    static logAxiosError(axiosError) {
        Logger.error(
            `An error occurred while trying to send a request to the server: ${
                axiosError.message
            }\n` +
            `Stack trace: ${axiosError.stack}\n` +
            `The request to the server was: ${JSON.stringify(axiosError.config)}\n` +
            `The response from the server was: ${JSON.stringify(axiosError.response)}`
        );
    }
}

module.exports = HttpClient;
