import React from "react";

export default function Input({
  type = "text",
  label,
  value,
  onChange,
  choices,
}) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <label
        style={{ display: "flex", flexDirection: "column", marginBottom: 10 }}
      >
        <span style={{ marginBottom: 5, fontWeight: "bold" }}>{label}</span>
        {type === "select" ? (
          <select onChange={(e) => onChange(e.target.value)} value={value}>
            <option></option>
            {choices.map((choice) => (
              <option key={choice}>{choice}</option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) =>
              onChange(type === "number" ? +e.target.value : e.target.value)
            }
          />
        )}
      </label>
    </div>
  );
}
