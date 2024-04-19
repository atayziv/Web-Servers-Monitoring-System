import axios from "axios";
import { config } from "../../config/config";
import { ClientLog } from "../../models/client-log";
import { HttpClient } from "../http-client";
import { Logger } from "../logger";

describe("The HttpClient service", () => {
    describe("in sendRequestToServer function", () => {
        it("should return the response data when the request does not fail", async () => {
            // Arrange
            const mockedMethod = "get";
            const mockedUrl = "/mocked/url";
            const mockedData = "mockedData";
            const mockedResponse = {
                data: "mockedResponse",
            };

            const requestSpy = jest.spyOn(axios, "request");
            requestSpy.mockResolvedValueOnce(mockedResponse);

            // Act
            const result = await HttpClient.sendRequestToServer(
                mockedMethod,
                mockedUrl,
                mockedData,
            );

            // Assert
            expect(result).toBe(mockedResponse.data);

            expect(requestSpy).toHaveBeenCalledTimes(1);

            const axiosRequestConfigParameter = requestSpy.mock.calls[0][0];
            expect(axiosRequestConfigParameter.method).toBe(mockedMethod);
            expect(axiosRequestConfigParameter.url).toBe(mockedUrl);
            expect(axiosRequestConfigParameter.data).toBe(mockedData);
        });

        it("should log all available data and throw an error when the request fails", async () => {
            // Arrange
            const mockedMethod = "get";
            const mockedUrl = "/mocked/url";
            const mockedData = "mockedData";
            const mockedResponse = {
                message: "mockedMessage",
                stack: "mockedStack",
                config: "mockedConfig",
                response: "mockedResponse",
            };

            const requestSpy = jest.spyOn(axios, "request");
            requestSpy.mockRejectedValueOnce(mockedResponse);

            const errorSpy = jest.spyOn(Logger, "error");
            errorSpy.mockImplementationOnce(jest.fn());

            // Act
            const resultPromise = HttpClient.sendRequestToServer(
                mockedMethod,
                mockedUrl,
                mockedData,
            );

            // Assert
            await expect(resultPromise).rejects.toStrictEqual(mockedResponse);

            expect(requestSpy).toHaveBeenCalledTimes(1);

            const axiosRequestConfigParameter = requestSpy.mock.calls[0][0];
            expect(axiosRequestConfigParameter.method).toBe(mockedMethod);
            expect(axiosRequestConfigParameter.url).toBe(mockedUrl);
            expect(axiosRequestConfigParameter.data).toBe(mockedData);

            expect(errorSpy).toHaveBeenCalledTimes(1);

            const messageParameter = errorSpy.mock.calls[0][0];
            expect(messageParameter).toContain(mockedResponse.message);
            expect(messageParameter).toContain(mockedResponse.stack);
            expect(messageParameter).toContain(mockedResponse.config);
            expect(messageParameter).toContain(mockedResponse.response);
        });
    });

    describe("in sendLogToServer function", () => {
        it("should sent the log object to the server when the request does not fail", async () => {
            // Arrange
            const mockedClientLog: ClientLog = {
                level: "debug",
                message: "mockedMessage",
            };

            const requestSpy = jest.spyOn(axios, "request");
            requestSpy.mockResolvedValueOnce({});

            // Act
            await HttpClient.sendLogToServer(mockedClientLog);

            // Assert
            expect(requestSpy).toHaveBeenCalledTimes(1);

            const axiosRequestConfigParameter = requestSpy.mock.calls[0][0];
            expect(axiosRequestConfigParameter.method).toBe("post");
            expect(axiosRequestConfigParameter.url).toBe(config.loggerUrl);
            expect(axiosRequestConfigParameter.data).toBe(mockedClientLog);
        });

        it("should log to the console and NOT throw an error when the request fails", async () => {
            // Arrange
            const mockedClientLog: ClientLog = {
                level: "debug",
                message: "mockedMessage",
            };

            const mockedResponse = {
                message: "mockedMessage",
            };

            const requestSpy = jest.spyOn(axios, "request");
            requestSpy.mockRejectedValueOnce(mockedResponse);

            const consoleSpy = jest.spyOn(console, "log");
            consoleSpy.mockImplementationOnce(jest.fn());

            // Act
            await HttpClient.sendLogToServer(mockedClientLog);

            // Assert
            expect(requestSpy).toHaveBeenCalledTimes(1);

            const axiosRequestConfigParameter = requestSpy.mock.calls[0][0];
            expect(axiosRequestConfigParameter.method).toBe("post");
            expect(axiosRequestConfigParameter.url).toBe(config.loggerUrl);
            expect(axiosRequestConfigParameter.data).toBe(mockedClientLog);

            expect(consoleSpy).toHaveBeenCalledTimes(1);

            const messageParameter = consoleSpy.mock.calls[0][0];
            expect(messageParameter).toContain(mockedResponse.message);
            expect(messageParameter).toContain(JSON.stringify(mockedClientLog));
        });
    });
});
