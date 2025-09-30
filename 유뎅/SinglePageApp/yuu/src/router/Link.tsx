import React from "react";

interface LinkProps {
  to: string;
  children: React.ReactNode;
}

export const Link = ({ to, children }: LinkProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, "", to);
    const navEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navEvent);
  };

  return (
    <a href={to} onClick={handleClick} style={{ padding: "4px" }}>
      {children}
    </a>
  );
};
