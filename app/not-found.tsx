import React from 'react';

export default function NotFound() {
  return (
    <main>
      <div className="error-container">
        <img src="..\images\error404Smiley.png" alt="Upside-Down Smiley Face" />
        <h1>Error 404: This page does not exist!</h1>
        <p>The page you're looking for seems to be missing or broken. We apologize for the inconvenience.</p>
      </div>
    </main>
  );
}
