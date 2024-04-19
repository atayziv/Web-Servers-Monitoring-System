import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import * as AsyncError from "../../../hooks/async-error";
import { AppContent } from "../component";

describe("The AppContent component", () => {
    it("should render the component's title", () => {
        // Act
        render(
            <MemoryRouter>
                <AppContent />
            </MemoryRouter>,
        );

        // Assert
        const textElement = screen.queryByText("This is our App's UI");
        expect(textElement).toBeInTheDocument();
    });

    it("should render the component's three buttons", () => {
        // Act
        render(
            <MemoryRouter>
                <AppContent />
            </MemoryRouter>,
        );

        // Assert
        const counterButtonElement = screen.queryByRole("button", {
            name: "I was clicked 0 times",
        });
        expect(counterButtonElement).toBeInTheDocument();

        const errorButtonElement = screen.queryByRole("button", { name: /throw/i });
        expect(errorButtonElement).toBeInTheDocument();

        const exampleButtonElement = screen.queryByRole("button", { name: /example/i });
        expect(exampleButtonElement).toBeInTheDocument();
    });

    it("should increase counter when the counter button is clicked", () => {
        // Arrange
        render(
            <MemoryRouter>
                <AppContent />
            </MemoryRouter>,
        );
        let counterButtonElement = screen.getByRole("button", { name: /i was clicked/i });

        // Act
        userEvent.click(counterButtonElement);

        // Assert
        counterButtonElement = screen.getByRole("button", { name: /i was clicked/i });
        expect(counterButtonElement).toHaveTextContent("I was clicked 1 times");
    });

    it("should throw an exception when the error button is clicked", () => {
        // Arrange
        const useAsyncErrorSpy = jest.spyOn(AsyncError, "useAsyncError");
        useAsyncErrorSpy.mockImplementationOnce(() => {
            return (): void => {
                jest.fn();
            };
        });

        render(
            <MemoryRouter>
                <AppContent />
            </MemoryRouter>,
        );
        const errorButtonElement = screen.getByRole("button", { name: /throw/i });

        // Act
        userEvent.click(errorButtonElement);

        // Assert
        expect(useAsyncErrorSpy).toHaveBeenCalledTimes(1);
    });
});
