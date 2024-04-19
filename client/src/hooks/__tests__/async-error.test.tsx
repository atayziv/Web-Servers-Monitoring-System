import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { useAsyncError } from "../async-error";

describe("The AsyncError hook", () => {
    it("should throw an error when used", () => {
        // Arrange
        jest.spyOn(console, "error").mockImplementation(); // don't throw the error in the console
        const errorMessage = "Mocked error";

        const MockedComponent = (): React.ReactElement => {
            const throwError = useAsyncError();
            const handleClick = (): void => {
                throwError(new Error(errorMessage));
            };
            return <button onClick={handleClick}>Mocked button</button>;
        };

        render(<MockedComponent />);
        const buttonElement = screen.getByRole("button");

        // Act
        const wrappedResult = (): void => {
            userEvent.click(buttonElement);
        };

        // Assert
        expect(wrappedResult).toThrow(errorMessage);
    });
});
