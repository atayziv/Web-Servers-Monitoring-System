import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { ISnackbar, Snackbar, SnackbarCallbacks, SnackbarContext } from "../component";

describe("The Snackbar component", () => {
    const dummySuccessMessage = "dummySuccessMessage";
    const dummyWarningMessage = "dummyWarningMessage";
    const dummyErrorMessage = "dummyErrorMessage";

    const mockedSnackbarCallbacks: jest.Mocked<SnackbarCallbacks> = {
        goBackCallback: jest.fn(),
        tryAgainCallback: jest.fn(),
    };

    const DummyComponent = (): React.ReactElement => {
        const snackbar = React.useContext(SnackbarContext) as ISnackbar;
        return (
            <>
                <button
                    onClick={(): void => {
                        snackbar.showSuccessMessage(dummySuccessMessage);
                    }}
                >
                    Show Success
                </button>
                <button
                    onClick={(): void => {
                        snackbar.showWarningMessage(dummyWarningMessage);
                    }}
                >
                    Show Warning
                </button>
                <button
                    onClick={(): void => {
                        snackbar.showErrorMessage(dummyErrorMessage);
                    }}
                >
                    Show Error
                </button>
                <button
                    onClick={(): void => {
                        snackbar.showErrorMessage(dummyErrorMessage, mockedSnackbarCallbacks);
                    }}
                >
                    Show Error with Callback Buttons
                </button>
            </>
        );
    };

    it("should not show alerts by default", () => {
        // Act
        render(
            <Snackbar>
                <DummyComponent />
            </Snackbar>,
        );

        // Assert
        const alertElement = screen.queryByRole("alert");
        expect(alertElement).not.toBeInTheDocument();
    });

    it("should show success alert when showSuccessMessage gets called", () => {
        // Arrange
        render(
            <Snackbar>
                <DummyComponent />
            </Snackbar>,
        );
        const mockedShowSuccessButtonElement = screen.getByRole("button", { name: "Show Success" });

        // Act
        userEvent.click(mockedShowSuccessButtonElement);

        // Assert
        const alertElement = screen.queryByRole("alert");
        expect(alertElement).toBeInTheDocument();
        expect(alertElement).toHaveTextContent(dummySuccessMessage);
    });

    it("should show warning alert when showWarningMessage gets called", () => {
        // Arrange
        render(
            <Snackbar>
                <DummyComponent />
            </Snackbar>,
        );
        const mockedShowWarningButtonElement = screen.getByRole("button", { name: "Show Warning" });

        // Act
        userEvent.click(mockedShowWarningButtonElement);

        // Assert
        const alertElement = screen.queryByRole("alert");
        expect(alertElement).toBeInTheDocument();
        expect(alertElement).toHaveTextContent(dummyWarningMessage);
    });

    it("should show error alert when showErrorMessage gets called", () => {
        // Arrange
        render(
            <Snackbar>
                <DummyComponent />
            </Snackbar>,
        );
        const mockedShowErrorButtonElement = screen.getByRole("button", { name: "Show Error" });

        // Act
        userEvent.click(mockedShowErrorButtonElement);

        // Assert
        const alertElement = screen.queryByRole("alert");
        expect(alertElement).toBeInTheDocument();
        expect(alertElement).toHaveTextContent(dummyErrorMessage);
    });

    it("should not show error alert's buttons by default", () => {
        // Arrange
        render(
            <Snackbar>
                <DummyComponent />
            </Snackbar>,
        );
        const mockedShowErrorButtonElement = screen.getByRole("button", { name: "Show Error" });

        // Act
        userEvent.click(mockedShowErrorButtonElement);

        // Assert
        const goBackButtonElement = screen.queryByRole("button", { name: /go back/i });
        expect(goBackButtonElement).not.toBeInTheDocument();

        const tryAgainButtonElement = screen.queryByRole("button", { name: /try again/i });
        expect(tryAgainButtonElement).not.toBeInTheDocument();
    });

    it("should call goBackCallback when goBackButton gets clicked", () => {
        // Arrange
        render(
            <Snackbar>
                <DummyComponent />
            </Snackbar>,
        );
        const mockedShowErrorWithCallbacksButtonElement = screen.getByRole("button", {
            name: "Show Error with Callback Buttons",
        });
        userEvent.click(mockedShowErrorWithCallbacksButtonElement);
        const goBackButtonElement = screen.getByRole("button", { name: /go back/i });

        // Act
        userEvent.click(goBackButtonElement);

        // Assert
        expect(mockedSnackbarCallbacks.goBackCallback).toHaveBeenCalledTimes(1);
    });

    it("should call tryAgainCallback when tryAgainButton gets clicked", () => {
        // Arrange
        render(
            <Snackbar>
                <DummyComponent />
            </Snackbar>,
        );
        const mockedShowErrorWithCallbacksButtonElement = screen.getByRole("button", {
            name: "Show Error with Callback Buttons",
        });
        userEvent.click(mockedShowErrorWithCallbacksButtonElement);
        const tryAgainButtonElement = screen.getByRole("button", { name: /try again/i });

        // Act
        userEvent.click(tryAgainButtonElement);

        // Assert
        expect(mockedSnackbarCallbacks.tryAgainCallback).toHaveBeenCalledTimes(1);
    });

    it("should close snackbar when the close button is clicked", () => {
        // Arrange
        render(
            <Snackbar>
                <DummyComponent />
            </Snackbar>,
        );
        const mockedShowErrorButtonElement = screen.getByRole("button", { name: "Show Error" });
        userEvent.click(mockedShowErrorButtonElement);
        const alertButtonElement = screen.getByRole("button", { name: "close" });

        // Act
        userEvent.click(alertButtonElement);

        // Assert
        const alertElement = screen.getByRole("alert");
        expect(alertElement).not.toBeVisible();
    });
});
