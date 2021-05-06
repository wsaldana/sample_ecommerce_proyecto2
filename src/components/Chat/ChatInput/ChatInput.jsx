import React from "react";
import "./ChatInput.css";

export default function ChatInput() {
  return (
    <div className="chat-input-bar">
      <input
        className="chat-input-message"
        placeholder="Type something..."
        maxLength="140"
      />
      <button className="btn btn-primary">
        <img
          alt="Send"
          src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxNzIgMTcyIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMCwxNzJ2LTE3MmgxNzJ2MTcyeiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxnIGZpbGw9IiNmZmZmZmYiPjxwYXRoIGQ9Ik0xNTcuNjY2NjcsMTQuMzMzMzNsLTE0My4zMzMzMyw1Mi4xMTIzbDM4Ljk2ODc1LDM4Ljk4Mjc1bDc1LjY5NzkyLC02Mi40MjgzOWwtNjIuNDI4MzksNzUuNjk3OTJsMzguOTgyNzUsMzguOTY4NzV6Ij48L3BhdGg+PC9nPjwvZz48L3N2Zz4="
          width="40px"
          height="40px"
        />
      </button>
    </div>
  )
}
