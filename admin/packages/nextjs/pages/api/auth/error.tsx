import React from "react";
import type { NextPageContext } from "next";
import ErrorPage from "~~/components/template/error";

type ErrorProps = {
    statusCode: number;
    message?: string;
};

function Error({ statusCode, message }: ErrorProps) {
    return <ErrorPage errStatus={statusCode} errMessage={message} />;
}

Error.getInitialProps = (ctx: NextPageContext) => {
    const { res, err } = ctx;
    // Inspect the status code and show the given template based off of it
    // Default to 404 page
    const statusCode = res ? res.statusCode : err ? err.statusCode : 403;
    const message = err ? err.message : "Admin Login Error";
    return { statusCode, message };
};

export default Error;
