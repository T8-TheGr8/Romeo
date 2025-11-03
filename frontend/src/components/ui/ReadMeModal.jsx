import React from "react";
import ReactMarkdown from "react-markdown";
import readmeContent from "../../../../README.md?raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import "../styles/Modal.css";

export default function ReadMeModal({ show, onClose }) {
  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <ReactMarkdown
          components={{
            code({ node, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");

              return match ? (
                <SyntaxHighlighter
                  style={dracula}
                  language={match[1]}
                  PreTag="div"
                  customStyle={{
                    background: "#2e3238",
                    borderRadius: "8px",
                    fontSize: "0.9rem",
                    padding: "1rem",
                    border: "1px solid var(--border)",
                  }}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code
                  {...props}
                  style={{
                    backgroundColor: "#2e3238",
                    color: "var(--accent)",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    fontFamily: "Roboto Mono, monospace",
                  }}
                >
                  {children}
                </code>
              );
            },
          }}
        >
          {readmeContent}
        </ReactMarkdown>

        <div className="modal-actions">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
