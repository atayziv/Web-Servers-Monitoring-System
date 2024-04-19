import { render } from "@testing-library/react";
import { Logger } from "../../../services/logger";
import { ErrorHandler } from "../component";

describe("The ErrorHandler component", () => {
    jest.spyOn(console, "error").mockImplementation(); // don't throw the error in the console

    const mockedErrorMessage = "Mocked error message";
    const MockedFailingComponent = (): React.ReactElement => {
        throw new Error(mockedErrorMessage);
        return <p>Mocked failing component</p>;
    };

    it("should write an error log when an internal error occurs", () => {
        // Arrange
        const errorSpy = jest.spyOn(Logger, "error");

        // Act
        render(
            <ErrorHandler>
                <MockedFailingComponent />
            </ErrorHandler>,
        );

        // Assert
        expect(errorSpy).toHaveBeenCalledTimes(1);

        const errorParameters = errorSpy.mock.calls[0];
        expect(errorParameters).toContain(mockedErrorMessage);
    });
});
