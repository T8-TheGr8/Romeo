import React from "react";
import "../styles/Card.css";

export default function Card({
  title,
  children,
  className = "",
  onClick,
  variant = "default",
  hover = false,
  layout = "column", // "column" | "row" | "split"
  sunken = "true"
}) {
  const classes = [
    "card",
    variant !== "default" ? `card-${variant}` : "",
    hover ? "card-hover" : "",
    `card-${layout}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");
    
  let sink = ""; 
  if (sunken == "true") {
    sink = "sunken";
  }

  return (
    <div className={classes} onClick={onClick}>
      {title && <h1 className="card-title">{title}</h1>}
      <div className={`card-content ${sink}`}>{children}</div>
    </div>
  );
}
