import { HttpClient } from "../http-client";
import { Logger } from "../logger";

describe("The Logger service", () => {
    describe("in debug function", () => {
        it("should call the client-logger with debug level and with stack when it is sent", () => {
            // Arrange
            const sendLogToServerSpy = jest.spyOn(HttpClient, "sendLogToServer");
            const mockedMessage = "mockedMessage";
            const mockedStack = "mockedStack";

            // Act
            // eslint-disable-next-line testing-library/no-debug
            Logger.debug(mockedMessage, mockedStack);

            // Assert
            expect(sendLogToServerSpy).toHaveBeenCalledTimes(1);

            const clientLogParameter = sendLogToServerSpy.mock.calls[0][0];
            expect(clientLogParameter.level).toBe("debug");
            expect(clientLogParameter.message).toBe(mockedMessage);
            expect(clientLogParameter.stack).toBe(mockedStack);
        });

        it("should call the client-logger with debug level and without stack when it is not sent", () => {
            // Arrange
            const sendLogToServerSpy = jest.spyOn(HttpClient, "sendLogToServer");
            const mockedMessage = "mockedMessage";

            // Act
            // eslint-disable-next-line testing-library/no-debug
            Logger.debug(mockedMessage);

            // Assert
            expect(sendLogToServerSpy).toHaveBeenCalledTimes(1);

            const clientLogParameter = sendLogToServerSpy.mock.calls[0][0];
            expect(clientLogParameter.level).toBe("debug");
            expect(clientLogParameter.message).toBe(mockedMessage);
            expect(clientLogParameter.stack).toBeUndefined();
        });
    });

    describe("in info function", () => {
        it("should call the client-logger with info level and with stack when it is sent", () => {
            // Arrange
            const sendLogToServerSpy = jest.spyOn(HttpClient, "sendLogToServer");
            const mockedMessage = "mockedMessage";
            const mockedStack = "mockedStack";

            // Act
            Logger.info(mockedMessage, mockedStack);

            // Assert
            expect(sendLogToServerSpy).toHaveBeenCalledTimes(1);

            const clientLogParameter = sendLogToServerSpy.mock.calls[0][0];
            expect(clientLogParameter.level).toBe("info");
            expect(clientLogParameter.message).toBe(mockedMessage);
            expect(clientLogParameter.stack).toBe(mockedStack);
        });

        it("should call the client-logger with info level and without stack when it is not sent", () => {
            // Arrange
            const sendLogToServerSpy = jest.spyOn(HttpClient, "sendLogToServer");
            const mockedMessage = "mockedMessage";

            // Act
            Logger.info(mockedMessage);

            // Assert
            expect(sendLogToServerSpy).toHaveBeenCalledTimes(1);

            const clientLogParameter = sendLogToServerSpy.mock.calls[0][0];
            expect(clientLogParameter.level).toBe("info");
            expect(clientLogParameter.message).toBe(mockedMessage);
            expect(clientLogParameter.stack).toBeUndefined();
        });
    });

    describe("in warn function", () => {
        it("should call the client-logger with warn level and with stack when it is sent", () => {
            // Arrange
            const sendLogToServerSpy = jest.spyOn(HttpClient, "sendLogToServer");
            const mockedMessage = "mockedMessage";
            const mockedStack = "mockedStack";

            // Act
            Logger.warn(mockedMessage, mockedStack);

            // Assert
            expect(sendLogToServerSpy).toHaveBeenCalledTimes(1);

            const clientLogParameter = sendLogToServerSpy.mock.calls[0][0];
            expect(clientLogParameter.level).toBe("warn");
            expect(clientLogParameter.message).toBe(mockedMessage);
            expect(clientLogParameter.stack).toBe(mockedStack);
        });

        it("should call the client-logger with warn level and without stack when it is not sent", () => {
            // Arrange
            const sendLogToServerSpy = jest.spyOn(HttpClient, "sendLogToServer");
            const mockedMessage = "mockedMessage";

            // Act
            Logger.warn(mockedMessage);

            // Assert
            expect(sendLogToServerSpy).toHaveBeenCalledTimes(1);

            const clientLogParameter = sendLogToServerSpy.mock.calls[0][0];
            expect(clientLogParameter.level).toBe("warn");
            expect(clientLogParameter.message).toBe(mockedMessage);
            expect(clientLogParameter.stack).toBeUndefined();
        });
    });

    describe("in error function", () => {
        it("should call the client-logger with error level and with stack when it is sent", () => {
            // Arrange
            const sendLogToServerSpy = jest.spyOn(HttpClient, "sendLogToServer");
            const mockedMessage = "mockedMessage";
            const mockedStack = "mockedStack";

            // Act
            Logger.error(mockedMessage, mockedStack);

            // Assert
            expect(sendLogToServerSpy).toHaveBeenCalledTimes(1);

            const clientLogParameter = sendLogToServerSpy.mock.calls[0][0];
            expect(clientLogParameter.level).toBe("error");
            expect(clientLogParameter.message).toBe(mockedMessage);
            expect(clientLogParameter.stack).toBe(mockedStack);
        });

        it("should call the client-logger with error level and without stack when it is not sent", () => {
            // Arrange
            const sendLogToServerSpy = jest.spyOn(HttpClient, "sendLogToServer");
            const mockedMessage = "mockedMessage";

            // Act
            Logger.error(mockedMessage);

            // Assert
            expect(sendLogToServerSpy).toHaveBeenCalledTimes(1);

            const clientLogParameter = sendLogToServerSpy.mock.calls[0][0];
            expect(clientLogParameter.level).toBe("error");
            expect(clientLogParameter.message).toBe(mockedMessage);
            expect(clientLogParameter.stack).toBeUndefined();
        });
    });
});
