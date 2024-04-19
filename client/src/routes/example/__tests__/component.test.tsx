import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Snackbar } from "../../../contexts/snackbar/component";
import { ExampleService } from "../../../services/example";
import { Example } from "../component";

describe("The Example component", () => {
    it("should call the get example service when the get example button is clicked", async () => {
        // Arrange
        const mockedResponse = "Mocked get example response";

        const getSpy = jest.spyOn(ExampleService, "get");
        getSpy.mockResolvedValueOnce(mockedResponse);

        render(
            <MemoryRouter>
                <Example />
            </MemoryRouter>,
        );
        const getExampleButtonElement = screen.getByRole("button", { name: /get/i });

        // Act
        userEvent.click(getExampleButtonElement);

        // Assert
        expect(getSpy).toHaveBeenCalledTimes(1);

        const paperElement = screen.getByRole("region");
        await waitFor(() => {
            expect(paperElement).toHaveTextContent(mockedResponse);
        });
    });

    it("should call the post example service when the post example button is clicked", async () => {
        // Arrange
        const mockedResponse = "Mocked post example response";

        const postSpy = jest.spyOn(ExampleService, "post");
        postSpy.mockResolvedValueOnce(mockedResponse);

        render(
            <MemoryRouter>
                <Example />
            </MemoryRouter>,
        );
        const postExampleButtonElement = screen.getByRole("button", { name: /post/i });

        // Act
        userEvent.click(postExampleButtonElement);

        // Assert
        expect(postSpy).toHaveBeenCalledTimes(1);

        const paperElement = screen.getByRole("region");
        await waitFor(() => {
            expect(paperElement).toHaveTextContent(mockedResponse);
        });
    });

    it("should call the delete example service when the delete example button is clicked", async () => {
        // Arrange
        const mockedResponse = "Mocked delete example response";

        const deleteSpy = jest.spyOn(ExampleService, "delete");
        deleteSpy.mockResolvedValueOnce(mockedResponse);

        render(
            <MemoryRouter>
                <Example />
            </MemoryRouter>,
        );
        const deleteExampleButtonElement = screen.getByRole("button", { name: /delete/i });

        // Act
        userEvent.click(deleteExampleButtonElement);

        // Assert
        expect(deleteSpy).toHaveBeenCalledTimes(1);

        const paperElement = screen.getByRole("region");
        await waitFor(() => {
            expect(paperElement).toHaveTextContent(mockedResponse);
        });
    });

    it("should show an alert when the show error button is clicked", () => {
        // Arrange
        render(
            <MemoryRouter>
                <Snackbar>
                    <Example />
                </Snackbar>
            </MemoryRouter>,
        );
        const showErrorButtonElement = screen.getByRole("button", { name: /show error/i });

        // Act
        userEvent.click(showErrorButtonElement);

        // Assert
        const alertElement = screen.getByRole("alert");
        expect(alertElement).toHaveTextContent("Sample error message");
    });
});
