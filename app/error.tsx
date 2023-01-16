"use client";
import React from "react";

const ErrorPage = ({ error }: { error: Error }) => {
  return (
    <main className="grow flex-center">
      <div>
        <h1>Something went wrong!</h1>
        <p>{error.message}</p>
      </div>
    </main>
  );
};

export default ErrorPage;
