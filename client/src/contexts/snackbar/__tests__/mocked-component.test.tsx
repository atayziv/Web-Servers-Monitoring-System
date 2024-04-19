import { SnackbarProps } from "@material-ui/core/Snackbar";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { ISnackbar, Snackbar, SnackbarContext } from "../component";

jest.mock("@material-ui/core/Snackbar", () => {
    const MockedSnackbar = (props: SnackbarProps): React.ReactElement => {
        const handleOnClose = (): void => {
            if (props.onClose) {
                props.onClose(undefined as unknown as React.SyntheticEvent, "clickaway");
            }
        };
        return (
            <>
                <div data-testid="isOpen">{props.open ? "true" : "false"}</div>
                <button onClick={handleOnClose}>Call onClose</button>
            </>
        );
    };
    return MockedSnackbar;
});

describe("The Mocked Snackbar component", () => {
    const DummyComponent = (): React.ReactElement => {
        const snackbar = React.useContext(SnackbarContext) as ISnackbar;
        return (
            <>
                <button
                    onClick={(): void => {
                        snackbar.showErrorMessage("dummyErrorMessage");
                    }}
                >
                    Show Error
                </button>
            </>
        );
    };

    it("should not close snackbar when other areas that the close button are clicked", () => {
        // Arrange
        render(
            <Snackbar>
                <DummyComponent />
            </Snackbar>,
        );
        let mockedIsOpenElement = screen.getByTestId("isOpen");
        expect(mockedIsOpenElement).toHaveTextContent("false");

        const mockedShowErrorButtonElement = screen.getByRole("button", { name: "Show Error" });
        userEvent.click(mockedShowErrorButtonElement);
        expect(mockedIsOpenElement).toHaveTextContent("true");

        const mockedOnCloseButtonElement = screen.getByRole("button", { name: /onclose/i });

        // Act
        userEvent.click(mockedOnCloseButtonElement);

        // Assert
        mockedIsOpenElement = screen.getByTestId("isOpen");
        expect(mockedIsOpenElement).toHaveTextContent("true");
    });
});
