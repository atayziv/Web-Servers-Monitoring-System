import { config } from "../../config/config";
import { ExampleService } from "../example";
import { HttpClient } from "../http-client";

describe("The ExampleService", () => {
    const sendRequestToServerSpy = jest.spyOn(HttpClient, "sendRequestToServer");

    afterEach(() => {
        sendRequestToServerSpy.mockReset();
    });

    describe("in get function", () => {
        it("should call the server's /example route with HTTP GET and return the server's response as a string", async () => {
            // Arrange
            sendRequestToServerSpy.mockResolvedValueOnce({ mockedResponse: "mockedResponse" });

            // Act
            const response = await ExampleService.get();

            // Assert
            expect(response).toBe('{"mockedResponse":"mockedResponse"}');

            expect(sendRequestToServerSpy).toHaveBeenCalledTimes(1);

            const methodParameter = sendRequestToServerSpy.mock.calls[0][0];
            const urlParameter = sendRequestToServerSpy.mock.calls[0][1];
            const dataParameter = sendRequestToServerSpy.mock.calls[0][2];
            expect(methodParameter).toBe("GET");
            expect(urlParameter).toBe(`${config.exampleUrl}/123`);
            expect(dataParameter).toBeUndefined();
        });
    });

    describe("in post function", () => {
        it("should call the server's /example route with HTTP POST and return the server's response as a string", async () => {
            // Arrange
            sendRequestToServerSpy.mockResolvedValueOnce({ mockedResponse: "mockedResponse" });

            // Act
            const response = await ExampleService.post();

            // Assert
            expect(response).toBe('{"mockedResponse":"mockedResponse"}');

            expect(sendRequestToServerSpy).toHaveBeenCalledTimes(1);

            const methodParameter = sendRequestToServerSpy.mock.calls[0][0];
            const urlParameter = sendRequestToServerSpy.mock.calls[0][1];
            const dataParameter = sendRequestToServerSpy.mock.calls[0][2];
            expect(methodParameter).toBe("POST");
            expect(urlParameter).toBe(config.exampleUrl);
            expect(dataParameter).toBeUndefined();
        });

        it("should call the server's /example route with HTTP POST and return the server's rejected response as a string", async () => {
            // Arrange
            sendRequestToServerSpy.mockRejectedValueOnce({
                response: {
                    data: {
                        mockedResponse: "mockedResponse",
                    },
                },
            });

            // Act
            const response = await ExampleService.post();

            // Assert
            expect(response).toBe('{"mockedResponse":"mockedResponse"}');

            expect(sendRequestToServerSpy).toHaveBeenCalledTimes(1);

            const methodParameter = sendRequestToServerSpy.mock.calls[0][0];
            const urlParameter = sendRequestToServerSpy.mock.calls[0][1];
            const dataParameter = sendRequestToServerSpy.mock.calls[0][2];
            expect(methodParameter).toBe("POST");
            expect(urlParameter).toBe(config.exampleUrl);
            expect(dataParameter).toBeUndefined();
        });
    });

    describe("in delete function", () => {
        it("should call the server's /example route with HTTP DELETE and return the server's response as a string", async () => {
            // Arrange
            sendRequestToServerSpy.mockResolvedValueOnce({ mockedResponse: "mockedResponse" });

            // Act
            const response = await ExampleService.delete();

            // Assert
            expect(response).toBe('{"mockedResponse":"mockedResponse"}');

            expect(sendRequestToServerSpy).toHaveBeenCalledTimes(1);

            const methodParameter = sendRequestToServerSpy.mock.calls[0][0];
            const urlParameter = sendRequestToServerSpy.mock.calls[0][1];
            const dataParameter = sendRequestToServerSpy.mock.calls[0][2];
            expect(methodParameter).toBe("DELETE");
            expect(urlParameter).toBe(config.exampleUrl);
            expect(dataParameter).toBeUndefined();
        });

        it("should call the server's /example route with HTTP DELETE and return the server's rejected response as a string", async () => {
            // Arrange
            sendRequestToServerSpy.mockRejectedValueOnce({
                response: {
                    data: {
                        mockedResponse: "mockedResponse",
                    },
                },
            });

            // Act
            const response = await ExampleService.delete();

            // Assert
            expect(response).toBe('{"mockedResponse":"mockedResponse"}');

            expect(sendRequestToServerSpy).toHaveBeenCalledTimes(1);

            const methodParameter = sendRequestToServerSpy.mock.calls[0][0];
            const urlParameter = sendRequestToServerSpy.mock.calls[0][1];
            const dataParameter = sendRequestToServerSpy.mock.calls[0][2];
            expect(methodParameter).toBe("DELETE");
            expect(urlParameter).toBe(config.exampleUrl);
            expect(dataParameter).toBeUndefined();
        });
    });
});
