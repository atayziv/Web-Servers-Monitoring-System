import { AxiosError } from "axios";
import { config } from "../config/config";
import { HttpClient } from "./http-client";

export class ExampleService {
    public static async get(): Promise<string> {
        const url = `${config.exampleUrl}/123`;
        const response = await HttpClient.sendRequestToServer("GET", url);
        return JSON.stringify(response);
    }

    public static async post(): Promise<string> {
        let response;
        try {
            response = await HttpClient.sendRequestToServer("POST", config.exampleUrl);
        } catch (error: unknown) {
            const axiosError = error as AxiosError;
            return JSON.stringify(axiosError.response?.data);
        }
        return JSON.stringify(response);
    }

    public static async delete(): Promise<string> {
        let response;
        try {
            response = await HttpClient.sendRequestToServer("DELETE", config.exampleUrl);
        } catch (error: unknown) {
            const axiosError = error as AxiosError;
            return JSON.stringify(axiosError.response?.data);
        }
        return JSON.stringify(response);
    }
}
