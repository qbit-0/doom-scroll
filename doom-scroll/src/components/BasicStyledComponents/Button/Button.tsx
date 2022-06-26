import React, { MouseEventHandler, ReactNode } from "react";

type Props = {
  highlight: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
};

const Button: React.FC<Props> = ({ highlight, onClick, children }) => {
  if (highlight) {
    return (
      <button
        onClick={onClick}
        type="button"
        className="p-2 border-2 border-amber-100 rounded-3xl decoration-zinc-600 decoration-4 transition-all bg-zinc-700 font-bold"
      >
        {children}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className="p-2 border-2 border-amber-100 rounded-3xl decoration-zinc-600 decoration-4 transition-all font-bold"
    >
      {children}
    </button>
  );
};

export default Button;
