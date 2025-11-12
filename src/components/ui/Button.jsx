import React from "react";

export function Button({ children, ...props }) {
  return (
    <button
      {...props}
      style={{
        padding: "0.5rem 1rem",
        backgroundColor: "#2563EB",
        color: "white",
        borderRadius: "0.375rem",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}
