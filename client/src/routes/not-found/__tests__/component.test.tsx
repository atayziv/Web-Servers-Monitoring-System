import { render, screen } from "@testing-library/react";
import { NotFound } from "../component";

describe("The NotFound component", () => {
    it("should render 'not found' titles", () => {
        // Act
        render(<NotFound />);

        // Assert
        const titleElements = screen.getAllByRole("heading");
        expect(titleElements[0]).toHaveTextContent("Error 404");
        expect(titleElements[1]).toHaveTextContent("Page not found");
    });
});
