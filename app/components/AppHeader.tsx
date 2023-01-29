import Link from "next/link";
import React from "react";

const AppHeader = () => {
  return (
    <header className="sticky top-0 bg-white">
      <div className="section-container flex justify-center py-3">
        <h1 className="text-2xl md:text-4xl">
          <Link href="/">Header</Link>
        </h1>
      </div>
    </header>
  );
};

export default AppHeader;
