import { render } from "@testing-library/react";
import { App } from "../component";

jest.unmock("react-router-dom");

describe("The App component", () => {
    it("should not throw errors on full render", () => {
        // Arrange
        const errorSpy = jest.spyOn(console, "error");

        // Act
        render(<App />);

        // Assert
        expect(errorSpy).toHaveBeenCalledTimes(0);
    });
});
