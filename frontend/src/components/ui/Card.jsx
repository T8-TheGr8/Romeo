import React from "react";
import "../styles/Card.css";

export default function Card({
  title,
  children,
  footer,
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
      {title && <h3 className="card-title">{title}</h3>}
      <div className={`card-content ${sink}`}>{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}
