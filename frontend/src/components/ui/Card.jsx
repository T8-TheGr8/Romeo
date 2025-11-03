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

  return (
    <div className={classes} onClick={onClick}>
      {title && <h3 className="card-title">{title}</h3>}
      <div className="card-content">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}
