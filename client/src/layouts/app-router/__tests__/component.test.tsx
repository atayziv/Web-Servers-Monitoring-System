import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AppRouter } from "../component";

describe("The AppRouter component", () => {
    it("should render the AppContent component by default", () => {
        // Act
        render(
            <MemoryRouter>
                <AppRouter />
            </MemoryRouter>,
        );

        // Assert
        const textElement = screen.queryByText("This is our App's UI");
        expect(textElement).toBeInTheDocument();
    });

    it("should render the Example component when browsing /example", () => {
        // Act
        render(
            <MemoryRouter initialEntries={["/example"]}>
                <AppRouter />
            </MemoryRouter>,
        );

        // Assert
        const getExampleButtonElement = screen.queryByRole("button", { name: /get/i });
        expect(getExampleButtonElement).toBeInTheDocument();
    });

    it("should render the NotFount component when browsing a non-existent route", () => {
        // Act
        render(
            <MemoryRouter initialEntries={["/some-mocked-route-that-does-not-exist"]}>
                <AppRouter />
            </MemoryRouter>,
        );

        // Assert
        const titleElements = screen.getAllByRole("heading");
        expect(titleElements[1]).toHaveTextContent("Error 404");
        expect(titleElements[2]).toHaveTextContent("Page not found");
    });
});
