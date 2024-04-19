import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppTitle } from "../component";

describe("The AppTitle component", () => {
    it("should render the component's menu icon", () => {
        // Act
        render(<AppTitle />);

        // Assert
        const menuButtonElement = screen.queryByRole("button", { name: "menu-button" });
        expect(menuButtonElement).toBeInTheDocument();
    });

    it("should render the component's title", () => {
        // Act
        render(<AppTitle />);

        // Assert
        const titleElement = screen.getByRole("heading");
        expect(titleElement).toHaveTextContent("App Title");
    });

    it("should open the menu when the menu button is clicked", () => {
        // Arrange
        render(<AppTitle />);

        // First, make sure the menu is closed by default
        let menuElement = screen.queryByRole("presentation");
        expect(menuElement).not.toBeInTheDocument();

        const menuButtonElement = screen.getByRole("button", { name: "menu-button" });

        // Act
        userEvent.click(menuButtonElement);

        // Assert
        menuElement = screen.queryByRole("presentation");
        expect(menuElement).toBeInTheDocument();
    });

    it("should close the menu when a menu item is clicked", () => {
        // Arrange
        render(<AppTitle />);

        // First, open the menu
        const menuButtonElement = screen.getByRole("button", { name: "menu-button" });
        userEvent.click(menuButtonElement);

        // Second, make sure it is open
        let menuElement = screen.queryByRole("presentation");
        expect(menuElement).toBeInTheDocument();

        const menuItemElements = screen.getAllByRole("menuitem");

        // Act
        userEvent.click(menuItemElements[0]);

        // Assert
        menuElement = screen.queryByRole("presentation");
        expect(menuElement).not.toBeInTheDocument();
    });
});
