// src/pages/Success.jsx
import React from "react";

export default function Success() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Success!</h1>
      <p style={styles.text}>Your action was completed successfully.</p>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "80vh",
    backgroundColor: "#f5f5f5",
    padding: "2rem",
  },
  heading: {
    color: "#07bc0c",
    fontSize: "3rem",
    marginBottom: "1rem",
  },
  text: {
    fontSize: "1.2rem",
    color: "#333",
  },
};
