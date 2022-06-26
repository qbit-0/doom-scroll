import React, { ReactNode } from "react";
import { ChangeEventHandler } from "react";

type Props = {
  value: string | number;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  children: ReactNode;
};

const Select: React.FC<Props> = ({ onChange, value, children }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="p-2 border-2 border-amber-100 rounded-3xl bg-transparent text-amber-100 font-bold"
    >
      {children}
    </select>
  );
};

export default Select;
