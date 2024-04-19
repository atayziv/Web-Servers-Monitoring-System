import axios, { AxiosError, AxiosRequestConfig, Method, ResponseType } from "axios";
import { config } from "../config/config";
import { ClientLog } from "../models/client-log";
import { Logger } from "./logger";

export class HttpClient {
    public static async sendRequestToServer<T>(
        method: Method,
        url: string,
        data?: unknown,
        responseType?: ResponseType,
    ): Promise<T> {
        const axiosRequestConfig: AxiosRequestConfig = {
            method,
            url,
            data,
            responseType,
        };

        let response;

        try {
            response = await axios.request<T>(axiosRequestConfig);
        } catch (error: unknown) {
            const axiosError = error as AxiosError;
            HttpClient.logAxiosError(axiosError);
            throw error;
        }

        return response.data;
    }

    public static async sendLogToServer(clientLog: ClientLog): Promise<void> {
        const axiosRequestConfig: AxiosRequestConfig = {
            method: "post",
            url: config.loggerUrl,
            data: clientLog,
        };

        try {
            await axios.request(axiosRequestConfig);
        } catch (error: unknown) {
            const axiosError = error as AxiosError;

            // eslint-disable-next-line no-console
            console.log(`A log could not be sent to the server.
            The error was: ${axiosError.message}
            The log was: ${JSON.stringify(clientLog)}`);
        }
    }

    private static logAxiosError(axiosError: AxiosError): void {
        Logger.error(`An error occurred while trying to send a request to the server: ${
            axiosError.message
        }
            Stack trace: ${axiosError.stack}
            The request to the server was: ${JSON.stringify(axiosError.config)}
            The response from the server was: ${JSON.stringify(axiosError.response)}`);
    }
}
