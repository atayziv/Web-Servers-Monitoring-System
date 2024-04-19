import React from "react";
import * as ReactRouter from "react-router-dom";

interface MockedBrowserRouterProps {
    children?: React.ReactNode;
}

const MockedBrowserRouter = (props: MockedBrowserRouterProps): React.ReactElement => {
    return <div>{props.children}</div>;
};

const { BrowserRouter, ...rest } = ReactRouter;

const MockedReactRouter = {
    ...rest,
    BrowserRouter: MockedBrowserRouter,
};

module.exports = MockedReactRouter;
